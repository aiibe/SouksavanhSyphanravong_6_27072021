const fs = require("fs");
const Handlebars = require("handlebars");

function compile(path, opts = {}) {
  const template = fs.readFileSync(path, "utf-8");
  return Handlebars.compile(template)(opts);
}

function createPage({ outputName, template, outputDir, data }) {
  let content = compile(template, data);
  let outputFile = `${outputDir}/${outputName}`;
  !fs.existsSync(outputDir) && fs.mkdirSync(outputDir);
  fs.writeFileSync(outputFile, content);
}

// Usage

// Paths
const templateDir = "./src/templates";
const outputDir = "./dist";

// Load data
const { photographers } = require("./src/fisheyeData.json");

// Create index.html
createPage({
  outputName: "index.html",
  outputDir,
  template: `${templateDir}/home.hbs`,
  data: {
    title: "Fisheye",
  },
});

// // Create page for each person
photographers.forEach((author) =>
  createPage({
    outputDir: `${outputDir}/authors`,
    outputName: `${author.name.toLowerCase().replace(" ", "-")}.html`,
    template: `${templateDir}/page.hbs`,
    data: { ...author, title: "Fisheye" },
  })
);
