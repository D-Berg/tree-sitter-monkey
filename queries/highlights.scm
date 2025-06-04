; highlights.scm

("let") @keyword
(fn_expression "fn" @keyword) 
"return" @keyword
(if_expression "if" @keyword)
(if_expression "else" @keyword)

(bool_expression "true" @number) 
(bool_expression "false" @number) 

(call_expression function: (identifier) @function.call)
(parameters (identifier) @parameter)
(line_comment) @comment
(string_expression) @string
(number) @number
; (index_expression object: (identifier) @type)
