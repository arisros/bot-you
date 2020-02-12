const {Builder, By, Key, until} = require('selenium-webdriver');
const sleep = require('sleep');
const ping = require('ping');
const proxy = require('selenium-webdriver/proxy');
const chrome = require('selenium-webdriver/chrome');
const listProxy = require('./list_proxy/index');
const chalk = require('chalk');
const log = console.log;

const screen = {
  width: 640,
  height: 480
};

const proxyServer = listProxy;

(async function () {  
  let views = 1;
  let success = 0;
  let currentIp = 0;

  async function view () {
    if (views === proxyServer.length) return;
    log(chalk.blue.bgBlueBright.bold(chalk.white(` Progress ${(views/proxyServer.length)*100}% `)));
    log(chalk.blue.bgBlueBright.bold(chalk.white(` Start get ${views} `)));
    if (currentIp === proxyServer.length) return;
    ping.promise.probe(proxyServer[currentIp].replace(/:.*/g, ''), {
      timeout: 1,
      extra: ["-i 2"],
    }).then(async function (res) {
      if (res.alive) {
        const driver = await new Builder()
          .forBrowser('chrome')
          .setChromeOptions(new chrome.Options().addArguments("--mute-audio").headless().windowSize(screen))
          .setProxy(proxy.manual({
            http: proxyServer[currentIp],
            https: proxyServer[currentIp]
          }))
          .build();
        try {
          await driver.get('https://www.youtube.com/watch?v=gRiLiJNbpiM');
          await sleep.sleep(1);
          await driver.findElement(By.css('button.ytp-large-play-button.ytp-button')).click();
        } catch (error) {
          log(chalk.blue.bgRed.bold(chalk.white(' Error Start ')));
          console.log(error)
          try {
            await driver.quit();
          } catch (error) {
            console.log('error quite')
          }
          log(chalk.blue.bgRed.bold(chalk.white(' Error End ')));
        } finally {
          currentIp++;
          views++;
          view();
          setTimeout(async () => {
            success++;
            try {
              await driver.quit();
            } catch (error) {
              console.log('error quite')
            }
            log(chalk.blue.bgGreen.bold(chalk.white(` Success get ${success} views`)));
          }, (1000 * (60 * 5)) + (1000 * 24));
          log(chalk.blue.bgBlueBright.bold(chalk.white(` Finish get ${views} `)));
          log(chalk.blue.bgGreenBright.bold(chalk.white(` Total get ${success} views`)));
        }
      }
    }).catch(e => {
      currentIp++;
      views++;
      view();
      console.log(e)
      log(chalk.blue.bgRed.bold(chalk.white(' Failed ping ')));
    })
  }

  try {
    view();
  } catch (error) {
    console.log(error)
  }
})(); 

