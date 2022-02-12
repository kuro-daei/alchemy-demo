module.exports = {
  trailingComma: 'es5',
  tabWitdh: 2,
  semi: true,
  singleQuote: true,
  overrides: [
    {
      files: '*.sol',
      options: {
        printWidth: 80,
        tabWidth: 2,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: false,
        explicitTypes: 'always',
      },
    },
  ],
};