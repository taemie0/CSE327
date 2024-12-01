module.exports = {
  presets: [
    '@babel/preset-env',      // For modern JavaScript
    '@babel/preset-react'     // For React and JSX
  ],
  plugins: [
    'transform-class-properties'  // If you use class properties, you may need this plugin
  ]
};
