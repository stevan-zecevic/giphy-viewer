// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier', 'plugin:@tanstack/eslint-plugin-query/recommended'],
  plugins: ['prettier', '@tanstack/query'],
  ignorePatterns: [
    'node_modules',
    'dist',
    'android',
    'ios',
    'public',
    '.expo',
    'babel.config.js',
    'tailwind.config.js',
    'metro.config.js',
    'expo-env.d.ts',
  ],
};
