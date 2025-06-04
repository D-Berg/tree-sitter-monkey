# Tree sitter grammar for [monkey lang](https://monkeylang.org/)

## Using with nvim

Put the following code in your `init.lua` or in a `parsers.lua` file and load it with `require("parsers")` after 
`nvim-treesitter` is loaded. To get syntax highlighting copy `quiries/highlighing.scm` to 
`{rtp}/quiries/monkey/highlighting.scm` (see [link](https://github.com/nvim-treesitter/nvim-treesitter#adding-parsers)).

```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()

parser_config.monkey = {
    install_info = {
        -- Replace this with the absolute path to your grammar folder
        url = "https://github.com/D-Berg/tree-sitter-monkey.git",
        branch = "main",
        files = { "src/parser.c" },
        -- optional:
        -- generate_requires_npm = true,
        -- requires_generate_from_grammar = true,
    },
    filetype = "monkey",
}


vim.filetype.add({
    extension = {
        mky = "monkey",
        mon = "monkey"
    }
})
```

