module.exports = {
  jest: config => {
    config.reporters = [
      "default",
      [
        "jest-html-reporter",
        {
          pageTitle: "Test Report",
          outputPath: "test-report.html"
        }
      ]
    ];
    return config;
  }
};
