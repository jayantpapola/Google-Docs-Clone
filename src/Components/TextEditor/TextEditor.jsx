// Import React dependencies.
import React, { useCallback, useMemo, useState } from "react";
// Import the Slate editor factory.
import { Editor, Element, Transforms, createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};

const TextEditor = () => {
  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem("content")) || [
        {
          type: "paragraph",
          children: [{ text: "A line of text in a paragraph." }],
        },
      ],
    []
  );
  const [NavbarButtons, setNavbarButtons] = useState({
    bold: false,
    code_block: false,
  });
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
  const Leaf = (props) => {
    return (
      <span
        {...props.attributes}
        style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
      >
        {props.children}
      </span>
    );
  };

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const [editor] = useState(() => withReact(createEditor()));
  // Render the Slate context.
  return (
    <div className="m-10 p-5 bg-slate-200">
      <Slate
        editor={editor}
        initialValue={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some(
            (op) => "set_selection" !== op.type
          );
          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value);
            localStorage.setItem("content", content);
          }
        }}
      >
        <div className="bg-slate-800 gap-1 flex mb-5 p-2 rounded">
          <button
            className={`px-3 py-1 ${
              !NavbarButtons.bold ? "bg-gray-200" : "bg-slate-500 text-white"
            } rounded`}
            onMouseDown={(event) => {
              event.preventDefault();
              setNavbarButtons({ ...NavbarButtons, bold: !NavbarButtons.bold });
              CustomEditor.toggleBoldMark(editor);
            }}
          >
            B
          </button>
          <button
            className={`px-3 py-1 ${
              !NavbarButtons.code_block
                ? "bg-gray-200"
                : "bg-slate-500 text-white"
            } rounded`}
            onMouseDown={(event) => {
              event.preventDefault();
              setNavbarButtons({
                ...NavbarButtons,
                code_block: !NavbarButtons.code_block,
              });
              CustomEditor.toggleCodeBlock(editor);
            }}
          >
            Code Block
          </button>
        </div>

        <div className="p-5 bg-gray-200">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              if (event.key === "&") {
                // Prevent the ampersand character from being inserted.
                event.preventDefault();
                // Execute the `insertText` method when the event occurs.
                editor.insertText("and");
              }
              if (!event.ctrlKey) {
                return;
              }
              switch (event.key) {
                case "`": {
                  event.preventDefault();
                  CustomEditor.toggleCodeBlock(editor);
                  break;
                }

                case "b": {
                  event.preventDefault();
                  CustomEditor.toggleBoldMark(editor);
                  break;
                }
              }
            }}
          />
        </div>
      </Slate>
    </div>
  );
};

export default TextEditor;
