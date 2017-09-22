#!usr/bin/env node

'use strict'; // Do not use any unneeded variables when running program

// Create json package and import plugins
const
  pkg               = require("./package.json"),

  Metalsmith        = require("metalsmith"),
  drafts            = require("metalsmith-drafts"),
  collections       = require("metalsmith-collections"),
  pug               = require("metalsmith-pug"),
  markdown          = require("metalsmith-markdown"),
  sass              = require("metalsmith-sass"),
  permalinks        = require("metalsmith-permalinks"),
  pagination        = require("metalsmith-pagination"),
  layouts           = require("metalsmith-layouts"),
  assets            = require("metalsmith-assets"),
  cssmin            = require("metalsmith-clean-css"),
  browsersync       = require("metalsmith-browser-sync")
;

var metadata = {
  site: {
    name: "Forestnal",
    author: "Nico Poblete",
    url:  "http://forestnal.net/"
  },
  description: "Sample project website using metalsmith, pug, and sass.",
  generator: "Metalsmith",
  version: pkg.version
};

var assetsopts = {
  source: './assets',
  destination: './assets'
};

var dir = {
  base: __dirname,
  src: './src',
  dest: './build'
};

var pugopts = {
  pretty: false,
  useMetadata: true
};

var collectionlist = {
  posts: {
    pattern: 'posts/**/*.md',
    sortBy: 'publishDate',
    reverse: true,
    refer: true
  },
  pages: {
    pattern: '**/*.md'
  }
}; // Set collection list

var permopts = {
  pattern: ':title'
  relative: false;
}; // Set permalink pattern and settings

var config = {
  engine: 'pug',
  directory: 'layouts',
  default: 'home.pug'
}; // Set layout engine to pug/jade

var clean = true; // Clean build directory?

var minify = {
  collapseBooleanAttributes: false,
  collapseWhitespace: true
}; // Compress html files

var cssminify = {
  files: 'assets/*.sass'
} // Compress sass files

var printdebug = false; // Print in debug information?

Metalsmith(dir.base)
  .clean(clean)   // Clean old files in build directory
  .metadata(metadata) // Get metadata for site
  .source(dir.src)    // Get source files
  .destination(dir.dest) // Put files into build
  .use(drafts())        // Enable drafts
  .use(collections(collections)) // Make collections list
  .use(pug(pugopts))  // Add pug-to-HTML plugin
  .use(markdown())    // Add markdown-to-HTML plugin
  .use(sass())        // Add sass-to-css plugin
  .use(pagination())  // Add pagination plugin
  .use(permalinks(permopts)) // Add permalinks plugin
  .use(layouts(config)) // Add layout into build
  .use(assets(assetsopts))    // Add assets plugin into build
  .use(cssmin(cssminify)) // Compress sass/scss files into build
  .use(debug(printdebug)) // Print out debug info
  .use(browsersync({
    server: './build',
    files: ['./src/**/*', './src/*.*', './assets/*'],
    port: 3000
  }), function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Browsersync server up\n");
    }
  })
  .build(function(err) {
    if (err) {
      throw err;
    } else {
      console.log("Build successful.\n");
    }
  }); // Call any exceptions if site unsuccessful

// DEBUG FUNCTION.
function debug(printdebug) {
  return function(done, Metalsmith, files) {
    if (printdebug) {
      console.log("\nMETADATA:");
      console.log(Metalsmith.metadata());

      for (var f in files) {
        console.log("\nFILE:");
        console.log(file[f]);
      }
    }
    done();
  }
}
