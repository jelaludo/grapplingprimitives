module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Disable rules that might cause issues
  },
  // Completely disable caching to prevent permission issues
  cache: false,
  cacheLocation: null,
  // Disable file watching to prevent file system issues
  useEslintrc: false,
  // Set cache strategy to none
  cacheStrategy: 'none'
};
