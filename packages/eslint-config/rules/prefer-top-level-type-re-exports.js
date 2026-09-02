/**
 * Requires type re-exports to use a top-level `export type` declaration.
 */
export const preferTopLevelTypeReExports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Require type re-exports to use top-level export type",
    },
    messages: {
      preferTopLevel:
        "Re-export '{{name}}' with a separate top-level `export type` declaration.",
    },
    schema: [],
  },
  create(context) {
    return {
      ExportNamedDeclaration(node) {
        if (node.exportKind === "type") {
          return;
        }

        for (const specifier of node.specifiers) {
          if (specifier.exportKind !== "type") {
            continue;
          }

          context.report({
            node: specifier,
            messageId: "preferTopLevel",
            data: {
              name:
                specifier.exported.type === "Identifier"
                  ? specifier.exported.name
                  : specifier.exported.value,
            },
          });
        }
      },
    };
  },
};
