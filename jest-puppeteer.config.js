module.exports = {
  launch: {
    headless: true
       
  },
  browser: 'chromium',
  browserContext: 'incognito',
  setupFilesAfterEnv: ['expect-puppeteer'],
  exitOnPageError: false,
  //args: ['--lang=en-GB,en']
};
