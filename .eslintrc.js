module.exports = {
  extends: "airbnb-base",
  env: {
    browser: true
  },
  rules: {
    "no-console": process.env.NODE_ENV === "development" ? "off" : "warn",
    "import/extensions":"off",
    "import/no-unresolved":"off",
  }
};
