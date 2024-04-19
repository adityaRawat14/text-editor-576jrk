// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: path.join(__dirname, "tsconfig.eslint.json"),
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended",
    "plugin:storybook/recommended",
    // TODO: uncomment to enable strict type checking
    "eslint:recommended",
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    "prettier"
  ],
  plugins: [
    "jest",
    "@typescript-eslint",
    "import",
    "react-hooks",
    "prettier",
    "unused-imports"
  ],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true
      },
      alias: {
        map: [["@", path.join(__dirname, "src")]],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
      }
    }
  },
  overrides: [
    {
      files: ["**/*.stories.*"],
      rules: {
        "no-alert": 0,
        "no-console": 0
      }
    }
  ],
  rules: {
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_"
      }
    ],
    "consistent-return": 0,
    "default-case": 0,
    "import/no-unresolved": 2,
    "import/order": [
      2,
      {
        "newlines-between": "always",
        groups: [
          ["external", "builtin"],
          "internal",
          "parent",
          ["index", "sibling"],
          "object",
          "type"
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        },
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal"
          }
        ]
      }
    ],
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": [
      2,
      {
        devDependencies: true
      }
    ],
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/no-noninteractive-tabindex": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "no-nested-ternary": 0,
    "no-param-reassign": 0,
    "no-plusplus": 0,
    "no-restricted-globals": 0,
    "no-restricted-syntax": 0,
    "no-undef": 0,
    "no-underscore-dangle": 0,
    "prettier/prettier": 2,
    "react/destructuring-assignment": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/jsx-props-no-spreading": 0,
    "react/no-array-index-key": 0,
    "react/no-danger": 0,
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "react/require-default-props": 0,
    "react/state-in-constructor": 0,
    "react/static-property-placement": 0,
    "react-hooks/exhaustive-deps": 2,
    "symbol-description": 0
  }
};
