/* Set Default */
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

/* Flags */
const dev = process.env.NODE_ENV === 'development';
const test = process.env.NODE_ENV === 'test';
const prod = process.env.NODE_ENV === 'production';

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: test ? 'cjs' : false, // Browser: Keep ES Modules Syntax for Webpack Treeshaking
        loose: false,
        targets: {
          ...(test ? { node: 'current' } : {}),
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    // Stage 0
    '@babel/plugin-proposal-function-bind',

    // Stage 1
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-logical-assignment-operators',
    ['@babel/plugin-proposal-optional-chaining', { loose: false }],
    ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
    '@babel/plugin-proposal-do-expressions',

    // Stage 2
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    '@babel/plugin-proposal-function-sent',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-numeric-separator',
    '@babel/plugin-proposal-throw-expressions',

    // Stage 3
    '@babel/plugin-syntax-import-meta',
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    '@babel/plugin-proposal-json-strings',

    '@babel/plugin-transform-runtime',
    'react-require',
    
    /* @babel/plugin-syntax-dynamic-import
      babel needs this for parsing but won't touch the syntax,
      webpack will handle the syntax.
    */
    test ? 'dynamic-import-node' : '@babel/plugin-syntax-dynamic-import',
    (dev || test) && '@babel/plugin-transform-react-jsx-source',
    prod && 'transform-react-remove-prop-types',
  ].filter(Boolean),
};
