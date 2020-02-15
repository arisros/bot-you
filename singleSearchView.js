const {Builder, By, Key, until} = require('selenium-webdriver');
const proxy = require('selenium-webdriver/proxy');
const firefox = require('selenium-webdriver/firefox');
const timer = require('wait-sleep');
const ping = require('ping');
const chalk = require('chalk');
const proxyServer = require('./list_proxy/index');

const log = console.log;
require('dotenv').config()
process.setMaxListeners(0);

const SCREEN = { width: 1080, height: 720 };
const KEYWORDS = process.env.KEYWORDS;
const TITLE = process.env.TITLE;
const MAX_DURATION_SECONDS = process.env.MAX_DURATION_SECONDS;
const MIN_DURATION_SECONDS = process.env.MIN_DURATION_SECONDS || 234;

(async function () {  
  let views = 1;
  let success = 0;
  let currentIp = 0;
  
  async function view () {
    let quit = false;
    log(chalk.blue.bgBlueBright.bold(chalk.white(` Progress ${Math.round(((currentIp + 1)/proxyServer.length)*100)}% | Proccess ${currentIp+ 1} `)));
    log(chalk.blue.bgBlueBright.bold(chalk.white(` Start get ${views} | Proccess ${currentIp + 1} `)));
    if (currentIp + 1 === proxyServer.length) return;
    log(chalk.magenta.bgMagenta(chalk.white(proxyServer[currentIp])))
    ping.promise.probe(proxyServer[currentIp].replace(/:.*/g, ''))
      .then(async function (res) {
      if (res.alive) {
        const driver = await new Builder()
          .forBrowser('firefox')
          .setFirefoxOptions(new firefox.Options()
            .headless()
            .setPreference("media.volume_scale", "0.0")
            .windowSize(SCREEN)
          )
          .setProxy(proxy.manual({
            http: proxyServer[currentIp],
            https: proxyServer[currentIp]
          }))
          .build();
        try {
          await driver.get('https://www.youtube.com');
          await driver.findElement(By.tagName('input')).sendKeys(KEYWORDS, Key.RETURN);
          await driver.wait(until.elementLocated(By.tagName('ytd-video-renderer')), 10000);
          const link = await driver.wait(until.elementLocated(By.css(`a[title='${TITLE}']`)))
          await link.click();
          const watchTime = (Math.floor(Math.random() * (MAX_DURATION_SECONDS - MIN_DURATION_SECONDS + 1)) + MIN_DURATION_SECONDS);
          await driver.wait(until.elementLocated(By.css(`div[id='subscribe-button']`)))
          await timer.wait(watchTime * 1000);
          log(chalk.blue.bgGreen.bold(chalk.white(` Close | Proccess ${views} | with watch time ${watchTime} seconds`)));
          await driver.quit();
        } catch (error) {
          log(chalk.blue.bgRed.bold(chalk.white(` Error Start | Proccess ${currentIp+ 1} `)));
          console.log(error)
          try {
            if (!quit) {
              quit = true;
              log(chalk.blue.bgRed.bold(chalk.white(` Close Error End | Proccess ${currentIp+ 1} `)));
              await driver.quit();
            }
          } catch (error) {
            console.log(error);
            console.log('error quit');
          }
          log(chalk.blue.bgRed.bold(chalk.white(` Error End | Proccess ${currentIp+ 1} `)));
        } finally {
          currentIp++;
          views++;
          view();
          log(chalk.blue.bgBlueBright.bold(chalk.white(` Finish get ${views} | Proccess ${currentIp+ 1}`)));
          log(chalk.blue.magenta.bold(chalk.white(` Total get ${success} views | Proccess ${currentIp+ 1}`)));
        }
      } else {
        currentIp++;
      }
    }).catch(e => {
      currentIp++;
      views++;
      view();
      console.log(e)
      log(chalk.blue.bgRed.bold(chalk.white(` Failed ping | Proccess ${currentIp+ 1} `)));
    })
  }

  try {
    view();
  } catch (error) {
    console.log(error)
  }
})();
