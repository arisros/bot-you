const {Builder, By, Key, until} = require('selenium-webdriver');
const sleep = require('sleep');
const ping = require('ping');
const proxy = require('selenium-webdriver/proxy')

const proxyServer = [
  // '36.89.180.25:54682',
  // '112.78.187.186:51038',
  // '114.5.195.226:8080',
  // '118.97.100.83:35220',
  // '103.28.226.125:32862',
  // '103.42.253.210:38141',
  // '112.78.169.98:36963',
  // '124.158.177.171:23500',
  // '43.248.24.157:51166',
  // '202.154.180.53:52937',
  // '36.67.27.189:47877',
  // '36.79.158.247:8080',
  // '43.248.24.158:51166',
  // '182.253.204.66:34967',
  // '103.76.200.41:23500',
  // '36.89.183.77:52442',
  // '202.93.227.14:53281',
  // '117.54.13.174:34190',
  // '103.78.80.194:33442',
  // '103.94.7.254:53281',
  // '202.93.228.150:39081',
  // '27.111.38.137:39850',
  // '103.76.201.30:23500',
  // '182.253.115.90:8080',
  // '182.253.94.103:8080',
  // '36.76.22.35:8080',
  // '119.252.160.165:3128',
  // '114.6.227.28:8080',
  // '180.250.54.27:53281',
  // '36.89.181.161:50204',
  // '202.75.97.82:47009',
  // '103.22.248.59:61661',
  // '36.81.32.123:3128',
  // '111.95.23.240:3128',
  '139.255.94.122:44315',
  '124.158.183.114:8080',
  '222.165.204.162:23500',
  '103.111.83.26:36549',
];


(async function example() {  
  let views = 1;
  let currentIp = 0;

  async function view () {
    if (currentIp === proxyServer.length) return;
    ping.promise.probe(proxyServer[currentIp].replace(/:.*/g, ''), {
      timeout: 5,
      extra: ["-i 2"],
    }).then(async function (res) {
      currentIp++;
      if (res.alive) {
        const driver = await new Builder()
          .forBrowser('firefox')
          .setProxy(proxy.manual({
            http: proxyServer[currentIp],
            https: proxyServer[currentIp]
          }))
          .build();
        try {
          // await driver.executeScript('window.open();');
          // await sleep.sleep(1);
          // const tabs = await driver.getAllWindowHandles();
          // await driver.switchTo().window(tabs[views]);
          // driver.setProxy(proxy.manual({
          //   http: proxyServer[currentIp],
          //   https: proxyServer[currentIp]
          // }))
          await driver.get('http://www.google.com/ncr');
          await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
          until.titleIs('webdriver - Google Search');
          views++;
        } catch (error) {
          console.log('******** error ');
          console.log(error);
          console.log('******** error');
        } finally {
          console.log('finished !!!!!!!!!!!' + views);
          view();
        }
      }
    }).catch(e => {
      console.error(e);
    })
  }

  view();
})(); 



// (async function example() {
//   let driver = await new Builder()
//     .forBrowser('firefox')
//     // .setProxy(proxy.manual({
//     //   http: proxyServer[0],
//     //   https: proxyServer[0]
//     // }))
//     .build();
    
//     try {
//     //   await driver.get('https://www.google.com');
//     //   await driver.executeScript('window.open();');
//     // // ((JavascriptExecutor) driver).executeScript("window.open()");
//     // // await driver.switchTo().window("");
//     // await driver.executeScript('window.open();');
//     // await driver.executeScript('window.open();');
//     // await driver.executeScript('window.open();');
//     // var tabs = await driver.getAllWindowHandles();
//     // console.log(tabs[3])

//     // await driver.switchTo().window(tabs[3]);
//     // await driver.findElement(By.css("body")).sendKeys(Key.CONTROL +"t");
//     // console.log(driver.findElement(By.css("body")))
//     // await driver.findElement(By.css("body")).sendKeys(Key.CONTROL +"t");
//     // console.log(driver.findElement(By.css("body")))
//     // await sleep.sleep(2);
    
//     // await driver.findElement(By.css("body")).sendKeys(Key.CONTROL +"t");
//     // console.log(driver.findElement(By.css("body")))
//     // await sleep.sleep(2);
    
//     // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
//     // await until.titleIs('webdriver - Google Search');
//     // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
//     // await driver.get('https://www.youtube.com/watch?v=gRiLiJNbpiM');
//     // await driver.findElement(By.css('button.ytp-large-play-button.ytp-button')).click();
//     // await sleep.sleep(324);
//   } finally {
//     // await driver.quit();
//   }
// })(); 

// (async function example() {
//   const driver = await new Builder()
//     .forBrowser('firefox')
//     .build();

//   async function View (index, ip, objDriver) {
//     try {
//       await objDriver.switchTo().window(tabs[index]);
//       // objDriver.setProxy(proxy.manual({
//       //   http: ip,
//       //   https: ip
//       // }))
//       // objDriver.usingWebDriverProxy(ip);
//       // await objDriver.get('https://www.youtube.com/watch?v=gRiLiJNbpiM');
//       // await objDriver.findElement(By.css('button.ytp-large-play-button.ytp-button')).click();
//       // objDriver.switchTo().window(current);
//       await objDriver.get('http://www.google.com/ncr');
//       // await objDriver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
//       until.titleIs('webdriver - Google Search');
//       await sleep.sleep(5);
//       // await objDriver.findElement(By.css("body")).sendKeys(Key.COMMAND +"t");
//       // await Key.chord(
//       //   Key.COMMAND, "t"
//       // );
//       // await objDriver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
//       return 1;
//     } catch (error) {
//       console.log(error);
//       throw new Error(error);
//     }
//   }

//   proxyServer.forEach(function (host, i) {
//     ping.promise.probe(host.replace(/:.*/g, ''), {
//         timeout: 5,
//         extra: ["-i 2"],
//     }).then(async function (res) {
//       if (res.alive) {
//         try {
//           await new View(i, host, driver);
//         } catch (error) {
//           console.log('********');
//           console.log(host);
//           console.log('========');
//           console.log(error);
//           console.log('********');
//         } finally {
//           console.log('finished !!!!!!!!!!!');
//         }
//       }
//     }).catch(e => {
//       console.error(e);
//     })
//   });
// })(); 

