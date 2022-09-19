module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    'require-prop-types': 0,
    'no-unused-vars': 1,
    'no-console': 'off',
    'no-lonely-if': 0,
    'vue/no-v-html': 0,
    'no-useless-escape': 0,
  },
};
