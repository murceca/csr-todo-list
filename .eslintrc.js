module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
    },
    "globals": {
        "ejs": "readonly",
        "nunjucks": "readonly",
        "Handlebars": "readonly",
        "$": "readonly"
    }
}
