#!usr/bin/env node

'use strict'; // Do not use any unneeded variables when running program

// Import json package and plugins
const
  pkg               = require("./package.json"),

  Metalsmith        = require("metalsmith"),
  assets            = require("metalsmith-assets"),
  markdown          = require("metalsmith-markdown"),
  pug               = require("metalsmith-pug"),
  layouts           = require("metalsmith-layouts"),
  collections       = require("metalsmith-collections"),
  pagination        = require("metalsmith-pagination"),
  htmlmin           = require("metalsmith-html-minifier"),
  cssmin            = require("metalsmith-clean-css"),
  browsersync       = require("metalsmith-browser-sync")
;

var metadata = {
  site: {
    name: "Forestnal",
    url:  "http://forestnal.net"
  },
  description:
};
