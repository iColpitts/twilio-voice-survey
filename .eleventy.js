const sass = require('./config/sass-process');

module.exports = eleventyConfig => {
  // Copy our static assets to the output folder
  eleventyConfig.addPassthroughCopy('js');
  eleventyConfig.addPassthroughCopy('images');
  sass('./styles/index.scss', './docs/styles/index.css');
  eleventyConfig.addPassthroughCopy('docs')
  // Returning something from the configuration function is optional
  return {
    dir: {
      output: 'public'
    }
  };
};
