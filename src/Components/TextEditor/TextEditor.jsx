// Import React dependencies.
import React, { useCallback, useState } from "react";
// Import the Slate editor factory.
import { Editor, Element, Transforms, createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];
const TextEditor = () => {
  // Define a React component renderer for our code blocks.
  const CodeElement = (props) => {
    return (
      <pre {...props.attributes}>
        <code>{props.children}</code>
      </pre>
    );
  };

  const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const [editor] = useState(() => withReact(createEditor()));
  // Render the Slate context.
  return (
    <Slate editor={editor} initialValue={initialValue}>
      <Editable
        renderElement={renderElement}
        onKeyDown={(event) => {
          if (event.key === "&") {
            // Prevent the ampersand character from being inserted.
            event.preventDefault();
            // Execute the `insertText` method when the event occurs.
            editor.insertText("and");
          }
          //   Otherwise, set the currently selected blocks type to "code".
          Transforms.setNodes(
            editor,
            { type: "code" },
            { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) }
          );
        }}
      />
    </Slate>
  );
};

export default TextEditor;
