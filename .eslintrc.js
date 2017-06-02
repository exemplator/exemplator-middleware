module.exports = {
  "extends": "google",
  "parser": "babel-eslint",
  rules: {
    "max-len": [2, 125, 4, {ignoreComments: true, ignoreUrls: true}],
    "new-cap": ["error", { "capIsNew": false }],
    "semi": "off",
    "comma-dangle":"off",
    "arrow-parens": ["error", "as-needed"],
    "valid-jsdoc": "off",
    "require-jsdoc": "off"
  }
};