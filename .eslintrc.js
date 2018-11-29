module.exports = {
  "root": true,
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "globals": {
    "console": true,
    "document": true
  },
  "extends": [
    "airbnb",
    "jest-enzyme",
    "prettier/react",
    "plugin:jest/recommended",
    "plugin:prettier/recommended"
  ],
  "plugins": [
    "babel",
    "react",
    "import",
    "jsx-a11y"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "react/jsx-filename-extension": 0,
    "import/no-extraneous-dependencies": ["error", { "devDependencies": true }],
    "indent": ["error", 4],
    "linebreak-style": ["error", "unix"],
    "max-len": [1, 120, 2, { "ignoreComments": true }],
    "no-unused-vars": ["error",
      {
        "vars": "all",
        "args": "after-used",
        "ignoreRestSiblings": false
      }
    ],
    "import/extensions": [
      "error",
      "always",
      { "js": "never", "jsx": "never" }
    ],
    "prettier/prettier": [
      "error", {
        "singleQuote": true,
        "trailingComma": "all",
        "tabWidth": 4,
        "useTabs": false,
        "jsxBracketSameLine:": true,
        "printWidth": 120
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": ['.js', '.jsx', '.ts', '.tsx']
      }
    },
}
}
