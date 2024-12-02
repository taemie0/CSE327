module.exports = {
  presets: ['module:metro-react-native-babel-preset',"@babel/preset-env", "@babel/preset-react"],
  plugins: [
    '@babel/plugin-transform-modules-commonjs', // This plugin will allow Jest to handle ES module imports
  ],
};
