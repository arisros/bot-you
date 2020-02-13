const CDP = require('chrome-remote-interface');

async function example() {
  let client;
  try {
    // connect to endpoint
    client = await CDP();
    // extract domains
    const {Network, Page} = client;
    // setup handlers
    Network.requestWillBeSent((params) => {
        console.log(params.request.url);
    });
    // enable events then start!
    await Network.enable();
    await Page.enable();
    await Page.navigate({url: 'https://www.youtube.com/watch?v=gRiLiJNbpiM'});
    await Page.loadEventFired();
  } catch (err) {
    console.error(err);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

example();
example();
example();
example();

pembalasan rossi buat yamaha#1moto gp hari inimotogpmotogp 2020berita motogp 2020berita motogp terbaru#19berita rossi terbaru#5rossi balas debdam#19kabar motogp terbaru#5motogp hari inikabar gp terbaru#4berita yamaha terbaru#8rossi di depak#11valentino rossi terbaru 2020#10rossi 2020info gp terbaru#10hasil motogp 2020gp terbaruber

pembalasan rossi buat yamaha, moto gp hari ini, motogp, motogp 2020, berita motogp 2020, berita motogp terbaru, berita rossi terbaru, rossi balas debdam, kabar motogp terbaru, motogp hari ini, kabar gp terbaru, berita yamaha terbaru, rossi di depak, valentino rossi terbaru 2020, rossi 2020, info gp terbaru, hasil motogp 2020, gp terbaru, berita moto gp 2020, motogp 2020 terbaru, kabar indonesia sport, gp hari ini, 
yamaha,motogp 2020,pembalap motor,nasib rossi,nasib rossi 2020,rossi 2020,nasib valentino rossi,nasib the doctor,valentino rossi 2020 motogp,valentino rossi 2020,yamaha depak,yamaha depak rossi,rossi di depak,info gp terbaru,gp hari ini,gp terbaru 2020,gp terbaru 2019,di depak yamaha,yamaha pembalap muda,valentino rossi gp,depak yamaha,nasib yamaha,motogp,pembalasan rossi buat yamaha,sunday rider,berita motogp