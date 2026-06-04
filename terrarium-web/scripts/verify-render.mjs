import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import { PNG } from "pngjs";

const target = process.env.TERRARIUM_VERIFY_URL || "http://127.0.0.1:3001";
const chromeCandidates = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium"
];
const executablePath = chromeCandidates.find(candidate => fs.existsSync(candidate));

if (!executablePath) {
  throw new Error("No local Chrome/Chromium executable found for render verification.");
}

const shotsDir = path.resolve("screenshots");
fs.mkdirSync(shotsDir, { recursive: true });

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 }
];

function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function analyzeScreenshot(buffer) {
  const png = PNG.sync.read(buffer);
  let activePixels = 0;
  let sampled = 0;
  const xStart = Math.floor(png.width * 0.2);
  const xEnd = Math.floor(png.width * 0.8);
  const yStart = Math.floor(png.height * 0.16);
  const yEnd = Math.floor(png.height * 0.78);

  for (let y = yStart; y < yEnd; y += 6) {
    for (let x = xStart; x < xEnd; x += 6) {
      const index = (png.width * y + x) << 2;
      const r = png.data[index];
      const g = png.data[index + 1];
      const b = png.data[index + 2];
      const lum = luminance(r, g, b);
      sampled += 1;
      if (lum > 18 && (r > 24 || g > 24 || b > 24)) {
        activePixels += 1;
      }
    }
  }

  return {
    sampled,
    activePixels,
    activeRatio: activePixels / Math.max(sampled, 1)
  };
}

const browser = await chromium.launch({
  executablePath,
  headless: true
});

const results = [];

for (const viewport of viewports) {
  const page = await browser.newPage({
    viewport: {
      width: viewport.width,
      height: viewport.height
    },
    deviceScaleFactor: 1,
    isMobile: viewport.name === "mobile"
  });

  const errors = [];
  page.on("console", message => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", error => errors.push(error.message));

  await page.goto(target, {
    waitUntil: "domcontentloaded",
    timeout: 45_000
  });
  await page.waitForTimeout(3_000);

  await page.waitForSelector("body", { timeout: 8_000 });
  const screenshotPath = path.join(shotsDir, `terrarium-${viewport.name}.png`);
  const screenshot = await page.screenshot({
    path: screenshotPath,
    fullPage: false,
    type: "png"
  });
  const analysis = analyzeScreenshot(screenshot);
  const canvasCount = await page.locator("canvas").count();
  const panelCount = await page.locator(".terrarium-panel").count();
  const h1 = await page.locator("h1").first().evaluate(el => el.textContent).catch(() => null);
  const bodyText = await page.locator("body").evaluate(el => el.textContent?.slice(0, 240) || "");

  results.push({
    viewport: viewport.name,
    h1,
    canvasCount,
    panelCount,
    screenshotPath,
    activeRatio: Number(analysis.activeRatio.toFixed(4)),
    bodyText,
    errors: errors.slice(0, 6)
  });

  await page.close();
}

await browser.close();

console.log(JSON.stringify(results, null, 2));

for (const result of results) {
  if (result.h1 !== "Grok Go Terrarium") {
    throw new Error(`Unexpected heading for ${result.viewport}: ${result.h1}`);
  }
  if (result.canvasCount < 1) {
    throw new Error(`No WebGL canvas found for ${result.viewport}.`);
  }
  if (result.panelCount < 3) {
    throw new Error(`Expected dashboard panels missing for ${result.viewport}.`);
  }
  if (result.activeRatio < 0.01) {
    throw new Error(`Canvas/screenshot appears blank for ${result.viewport}.`);
  }
  const fatalErrors = result.errors.filter(error => !error.includes("WebSocket"));
  if (fatalErrors.length) {
    throw new Error(`Browser errors for ${result.viewport}: ${fatalErrors.join(" | ")}`);
  }
}
