const {Builder, By, Key, until} = require('selenium-webdriver');
// const sleep = require('sleep');
const ping = require('ping');
const proxy = require('selenium-webdriver/proxy');
const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');
const proxyServer = require('./list_proxy/index');
const chalk = require('chalk');
const log = console.log;

ping.promise.probe('202.138.248.187')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err);
  });

ping.promise.probe('36.67.121.91')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err);
  });

ping.promise.probe('36.76.22.35')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err);
  });

ping.promise.probe('139.255.74.125')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err);
  });

ping.promise.probe('110.76.148.242')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err);
  });

ping.promise.probe('36.78.159.183')
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err);
  });