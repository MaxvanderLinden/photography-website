const Image = require("@11ty/eleventy-img");
const fs = require("fs");
const path = require("path");

const isProduction = process.env.NODE_ENV === "production";
const pathPrefix = isProduction ? "/photography-website/" : "/";

async function imageShortcode(src, alt, sizes = "100vw") {
  // Resolve absolute paths relative to project root
  const resolved = src.startsWith("/")
    ? path.join(process.cwd(), "src", src)
    : src;

  // Skip processing if the source image doesn't exist yet
  if (!fs.existsSync(resolved)) {
    return `<img src="${src}" alt="${alt}" loading="lazy" decoding="async" />`;
  }

  let metadata = await Image(resolved, {
    widths: [400, 800, 1200, 1600],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/assets/images/",
    urlPath: `${pathPrefix}assets/images/`
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  };

  return Image.generateHTML(metadata, imageAttributes);
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addFilter("dateYear", () => new Date().getFullYear());
  eleventyConfig.addFilter("htmlDateString", (date) => {
    return new Date(date).toISOString().split("T")[0];
  });

  return {
    pathPrefix,
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
