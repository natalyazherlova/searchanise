module.exports = {
  launch: {
    headless: false
       
  },
  browser: 'chromium',
  browserContext: 'incognito',
  setupFilesAfterEnv: ['expect-puppeteer'],
  exitOnPageError: false,
  //args: ['--lang=en-GB,en']
};
