const std = @import("std");

pub fn build(b: *std.Build) void {
    const optimize = b.standardOptimizeOption(.{});
    const target = b.standardTargetOptions(.{});
    const linkage = b.option(std.builtin.LinkMode, "linkage", "Specify link mode") orelse .static;

    const tree_sitter_monkey_mod = b.addModule("tree-sitter-monkey", .{
        .target = target,
        .optimize = optimize,
        .link_libc = true,
    });
    tree_sitter_monkey_mod.addCSourceFile(.{
        .file = b.path("src/parser.c"),
        .flags = &.{},
        .language = .c,
    });

    tree_sitter_monkey_mod.addIncludePath(b.path("src"));

    const tree_sitter_monkey_lib = b.addLibrary(.{
        .name = "tree-sitter-monkey",
        .root_module = tree_sitter_monkey_mod,
        .linkage = linkage,
    });

    b.installArtifact(tree_sitter_monkey_lib);
}
