/**
 * @file Monkey grammar for tree-sitter
 * @author Daniel Berg
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check
//
function sepBy(sep, rule) {
  return seq(rule, repeat(seq(sep, rule)));
}

const PREC = {
  lowest: 0,
  equals: 1,
  lessgreater: 2,
  sum: 3,
  product: 4,
  prefix: 5,
  call: 7,
  index: 8,
};

module.exports = grammar({
  name: "monkey",

  conflicts: $ => [
    [$.dictionary_expression, $.block_statement]
  ],

  rules: {
    // TODO: add the actual grammar rules
    program: $ => repeat($.statement),

    statement: $ => seq(
      choice(
        $.line_comment,
        $.let_statement,
        $.return_statement,
        $.expression,
        $.block_statement
      ),
      optional(";")
    ),

    let_statement: $ => seq(
      "let",
      field("name", $.identifier),
      '=',
      field("value", $.expression),
      ';'
    ),

    return_statement: $ => seq(
      "return",
      field("value", $.expression),
    ),

    expression: $ => choice(
      $.identifier,
      $.number,
      $.bool_expression,
      $.call_expression,
      $.fn_expression,
      $.if_expression,
      $.infix_expression,
      $.prefix_expression,
      $.string_expression,
      $.array_expression,
      $.dictionary_expression,
      $.index_expression
    ),


    string_expression: _ => token(seq('"', /[^"\\]*/, '"')),

    bool_expression: _ => choice(
      'true',
      'false'
    ),

    prefix_expression: $ => prec(
      PREC.prefix,
      seq(
        field("operator", choice("!", "-")),
        field("argument", choice($.expression))
      )
    ),

    infix_expression: $ => choice(
      prec.left(PREC.equals, seq($.expression, "==", $.expression)),
      prec.left(PREC.lessgreater, seq($.expression, "<=", $.expression)),
      prec.left(PREC.lessgreater, seq($.expression, ">=", $.expression)),
      prec.left(PREC.sum, seq($.expression, "+", $.expression)),
      prec.left(PREC.sum, seq($.expression, "-", $.expression)),
      prec.left(PREC.product, seq($.expression, "/", $.expression)),
      prec.left(PREC.product, seq($.expression, "*", $.expression)),
    ),
    
    if_expression: $ => seq(
      "if",
      '(',
      field("condition", $.expression),
      ')',
      field("consequence", $.block_statement),
      optional(field("alternative", seq("else", $.block_statement)))
    ),

    fn_expression: $ => seq(
      "fn",
      $.parameters,
      field("body", $.block_statement)
    ),

    call_expression: $ => prec(
      PREC.call,
      seq(
        field("function", $.identifier), 
        "(",
        field("arg", optional(sepBy(",", $.expression))),
        ")"
      ) 
    ),

    parameters: $ => seq(
      '(',
      field("param", optional(sepBy(",", $.identifier))),
      ')'
    ),

    array_expression: $ => seq(
      "[",
      field("element", optional(sepBy(",", $.expression))),
      "]"
    ),

    dictionary_expression: $ => seq(
      "{",
      field(
        "key_val", 
        optional(sepBy(",", seq(
          field("key", $.string_expression),
          ":",
          field("value", $.expression),
        )))
      ),
      "}"
    ),

    index_expression: $ => prec.left(
      PREC.index,
      seq(
        field("object", $.identifier), 
        "[", 
        $.expression, 
        "]"
      )
    ),

    block_statement: $ => seq(
      '{',
      repeat($.statement),
      '}'
    ),

    identifier: _ => /[a-zA-Z_][a-zA-Z0-9_]*/,
    number: _ => /\d+/,

    line_comment: _ => token(seq("//", /.*/))

  }
});
