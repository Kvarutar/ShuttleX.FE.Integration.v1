module.exports = {
  root: true,
  parserOptions: { project: 'tsconfig.json' },
  ignorePatterns: ['lib', 'example', '.eslintrc.js', 'babel.config.js'],
  extends: './devtools/eslintDefaultConfig.json',
};
