const {Builder, By, Key, until} = require('selenium-webdriver');
const sleep = require('sleep');
const ping = require('ping');
const proxy = require('selenium-webdriver/proxy');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const listProxy = require('./list_proxy/index');
const chalk = require('chalk');
const log = console.log;

const screen = {
  width: 1080,
  height: 720
};

const driver = await new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(new firefox.Options().addArguments("--mute-audio").windowSize(screen))
  // .setChromeOptions(new chrome.Options().headless().addArguments("--mute-audio").windowSize(screen))
  .setProxy(proxy.manual({
    http: proxyList[i][currentIp],
    https: proxyList[i][currentIp]
  }))
  .build();
try {
  await driver.get('https://www.youtube.com/watch?v=gRiLiJNbpiM');
  // playBtn = await driver.wait(until.elementLocated(By.css('btn.ytp-large-play-button.ytp-button')), 1000);
  // await playBtn.click();
  await driver.findElement(By.css('button.ytp-large-play-button.ytp-button')).click();
} catch (error) {
  log(chalk.blue.bgRed.bold(chalk.white(' Error Start ')));
  console.log(error)
  try {
    if (!quit) {
      quit = true;
      await driver.quit();
    }
  } catch (error) {
    console.log(error);
    console.log('error quit');
  }
  log(chalk.blue.bgRed.bold(chalk.white(' Error End ')));
} finally {
  currentIp++;
  views++;
  view();
  setTimeout(async () => {
    success++;
    try {
      if (!quit) {
        quit = true;
        await driver.quit();
      }
    } catch (error) {
      console.log(error);
      console.log('error quit');
    }
    log(chalk.blue.bgGreen.bold(chalk.white(` Success get ${success} views`)));
  }, (1000 * (60 * 5)) + (1000 * 24));
  log(chalk.blue.bgBlueBright.bold(chalk.white(` Finish get ${views} `)));
  log(chalk.blue.bgGreenBright.bold(chalk.white(` Total get ${success} views`)));
}