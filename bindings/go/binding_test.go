package tree_sitter_monkey_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_monkey "github.com/d-berg/tree-sitter-monkey.git/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_monkey.Language())
	if language == nil {
		t.Errorf("Error loading Monkey grammar")
	}
}
