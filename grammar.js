/**
 * @file Monkey grammar for tree-sitter
 * @author Daniel Berg
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "monkey",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
