module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "es2021": true,
        "jest/globals": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "jest"
    ],
    "rules": {
        "jest/no-disabled-tests": "warn",
        "jest/no-identical-title": "error",
        "jest/valid-expect": "error",
        "react/prop-types": "off",
        "react/jsx-uses-react": "off",   
        "react/jsx-uses-vars": "off",
        "no-unused-vars": "off"
    }
}