const {Builder, By, Key, until} = require('selenium-webdriver');
const sleep = require('sleep');
const ping = require('ping');
const proxy = require('selenium-webdriver/proxy');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const proxyServer = require('./list_proxy/index');
const chalk = require('chalk');
const log = console.log;
// require('events').EventEmitter.defaultMaxListeners = 15;

process.setMaxListeners(0);
const SCREEN = {
  width: 1080,
  height: 720
};

const SECTION = 5;
let proxyList = [];

for (let i = 0; i < SECTION; i++) {
  proxyList = [...proxyList, proxyServer.slice(i, Math.floor(proxyServer.length / SECTION))];
}

for (let i = 0; i < proxyList.length; i++) {
  (async function () {  
    let views = 1;
    let success = 0;
    let currentIp = 0;
    
    async function view () {
      let quit = false;
      log(chalk.blue.bgBlueBright.bold(chalk.white(` Progress ${Math.round(((currentIp + 1)/proxyList[i].length)*100)}% | Proccess ${i + 1} `)));
      log(chalk.blue.bgBlueBright.bold(chalk.white(` Start get ${views} | Proccess ${i + 1} `)));
      if (currentIp + 1 === proxyList[i].length) return;
      log(chalk.magenta.bgMagenta(chalk.white(proxyList[i][currentIp])))
      ping.promise.probe(proxyList[i][currentIp].replace(/:.*/g, ''))
        .then(async function (res) {
        if (res.alive) {
          // ytd-popup-container class style-scope ytd-app
          // let playBtn = null;
          const driver = await new Builder()
            .forBrowser('firefox')
            // .headless()
            .setFirefoxOptions(new firefox.Options().headless().addArguments("--mute-audio").windowSize(SCREEN))
            // .setChromeOptions(new chrome.Options().headless().addArguments("--mute-audio").windowSize(SCREEN))
            .setProxy(proxy.manual({
              http: proxyList[i][currentIp],
              https: proxyList[i][currentIp]
            }))
            .build();
          try {
            await driver.get('https://www.youtube.com/watch?v=gRiLiJNbpiM');
            // playBtn = await driver.wait(until.elementLocated(By.css('btn.ytp-large-play-button.ytp-button')), 1000);
            // await playBtn.click();
            await sleep.sleep(1);
            await driver.findElement(By.css('button.ytp-large-play-button.ytp-button')).click();
          } catch (error) {
            log(chalk.blue.bgRed.bold(chalk.white(` Error Start | Proccess ${i + 1} `)));
            console.log(error)
            try {
              if (!quit) {
                quit = true;
                log(chalk.blue.bgRed.bold(chalk.white(` Close Error End | Proccess ${i + 1} `)));
                await driver.quit();
              }
            } catch (error) {
              console.log(error);
              console.log('error quit');
            } finally {
              currentIp++;
              views++;
              view();
            }
            log(chalk.blue.bgRed.bold(chalk.white(` Error End | Proccess ${i + 1} `)));
          } finally {
            currentIp++;
            views++;
            view();
            setTimeout(async () => {
              success++;
              try {
                if (!quit) {
                  quit = true;
                  log(chalk.blue.bgGreen.bold(chalk.white(` Close | Proccess ${i + 1}`)));
                  await driver.quit();
                }
              } catch (error) {
                console.log(error);
                console.log('error quit');
              }
              log(chalk.blue.bgGreen.bold(chalk.white(` Success get ${success} views | Proccess ${i + 1}`)));
            // }, 10);
            }, (1000 * (60 * (Math.floor(Math.random() * (5 - 2 + 1)) + 2))) + (1000 * 24));
            log(chalk.blue.bgBlueBright.bold(chalk.white(` Finish get ${views} | Proccess ${i + 1}`)));
            log(chalk.blue.magenta.bold(chalk.white(` Total get ${success} views | Proccess ${i + 1}`)));
          }
        } else {
          currentIp++;
        }
      }).catch(e => {
        currentIp++;
        views++;
        view();
        console.log(e)
        log(chalk.blue.bgRed.bold(chalk.white(` Failed ping | Proccess ${i + 1} `)));
      })
    }
  
    try {
      view();
    } catch (error) {
      console.log(error)
    }
  })(); 
    
}
// (async function () {  
//   let views = 1;
//   let success = 0;
//   let currentIp = 0;
  
//   async function view () {
//     let quit = false;
//     log(chalk.blue.bgBlueBright.bold(chalk.white(` Progress ${(views/proxyServer.length)*100}% `)));
//     log(chalk.blue.bgBlueBright.bold(chalk.white(` Start get ${views} `)));
//     // if (currentIp === proxyServer.length) return;
//     ping.promise.probe(proxyServer[currentIp].replace(/:.*/g, ''), {
//       timeout: 1,
//       extra: ["-i 2"],
//     }).then(async function (res) {
//       if (res.alive) {
//         // ytd-popup-container class style-scope ytd-app
//         // let playBtn = null;
//         const driver = await new Builder()
//           .forBrowser('firefox')
//           // .headless()
//           .setFirefoxOptions(new firefox.Options().headless().addArguments("--mute-audio").windowSize(SCREEN))
//           // .setChromeOptions(new chrome.Options().headless().addArguments("--mute-audio").windowSize(SCREEN))
//           .setProxy(proxy.manual({
//             http: proxyServer[currentIp],
//             https: proxyServer[currentIp]
//           }))
//           .build();
//         try {
//           await driver.get('https://www.youtube.com/watch?v=gRiLiJNbpiM');
//           // playBtn = await driver.wait(until.elementLocated(By.css('btn.ytp-large-play-button.ytp-button')), 1000);
//           // await playBtn.click();
//           await driver.findElement(By.css('button.ytp-large-play-button.ytp-button')).click();
//         } catch (error) {
//           log(chalk.blue.bgRed.bold(chalk.white(' Error Start ')));
//           console.log(error)
//           try {
//             if (!quit) {
//               quit = true;
//               await driver.quit();
//             }
//           } catch (error) {
//             console.log(error);
//             console.log('error quit');
//           }
//           log(chalk.blue.bgRed.bold(chalk.white(' Error End ')));
//         } finally {
//           currentIp++;
//           views++;
//           view();
//           setTimeout(async () => {
//             success++;
//             try {
//               if (!quit) {
//                 quit = true;
//                 await driver.quit();
//               }
//             } catch (error) {
//               console.log(error);
//               console.log('error quit');
//             }
//             log(chalk.blue.bgGreen.bold(chalk.white(` Success get ${success} views`)));
//           }, (1000 * (60 * 5)) + (1000 * 24));
//           log(chalk.blue.bgBlueBright.bold(chalk.white(` Finish get ${views} `)));
//           log(chalk.blue.bgGreenBright.bold(chalk.white(` Total get ${success} views`)));
//         }
//       }
//     }).catch(e => {
//       currentIp++;
//       views++;
//       view();
//       console.log(e)
//       log(chalk.blue.bgRed.bold(chalk.white(' Failed ping ')));
//     })
//   }

//   try {
//     view();
//   } catch (error) {
//     console.log(error)
//   }
// })(); 

