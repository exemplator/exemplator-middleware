module.exports = {
  "extends": "google",
  "parser": "babel-eslint",
  rules: {
    "max-len": [2, 125, 4, {ignoreComments: true, ignoreUrls: true}],
    "new-cap": ["error", { "capIsNew": false }],
    "semi": ["error", "never"],
    "comma-dangle": ["error", "never"]
  }
};