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

// Utils
function slug(name) {
  return name.toLowerCase().replace(" ", "-");
}

// Usage

// Paths
const templateDir = "./src/templates";
const outputDir = "./dist";

// Load data
const { photographers } = require("./src/fisheyeData.json");

// Handlebars helpers
Handlebars.registerHelper("concat", (stringA, stringB) => stringA + stringB);
Handlebars.registerHelper(
  "sluggy",
  (name, root) => root + slug(name) + ".html"
);

// Create index.html
createPage({
  outputName: "index.html",
  outputDir,
  template: `${templateDir}/home.hbs`,
  data: {
    title: "Fisheye",
    tags: [
      { name: "Portrait" },
      { name: "Art" },
      { name: "Fashion" },
      { name: "Architecture" },
      { name: "Travel" },
      { name: "Sports" },
      { name: "Animals" },
      { name: "Events" },
    ],
    photographers,
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
