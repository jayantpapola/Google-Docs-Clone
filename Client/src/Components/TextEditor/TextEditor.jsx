// Import React dependencies.
import React, { useCallback, useMemo, useState } from "react";
// Import the Slate editor factory.
import { Editor, Element, Transforms, createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

// Define our own custom set of helpers.

const TextEditor = () => {
  const initialValue = useMemo(
    () =>
      JSON.parse(localStorage.getItem("content")) || [
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
      ],
    []
  );
  const [NavbarButtons, setNavbarButtons] = useState({
    bold: false,
    underline: false,
    italic: false,
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

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  const renderLeaf = useCallback((props) => {
    return (
      <span
        {...props.attributes}
        className={`${props.leaf.underline && "underline"} ${
          props.leaf.bold && "font-bold"
        } ${props.leaf.italic && "italic"}`}
        // style={{
        //   fontWeight: props.leaf.bold ? "bold" : "normal",
        //   fontStyle: props.leaf.italic ? "italic" : "normal",
        // }}
      >
        {props.children}
      </span>
    );
  }, []);

  const [editor] = useState(() => withReact(createEditor()));
  // Render the Slate context.
  return (
    <div className="p-5 ">
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
        <div className="bg-slate-100 gap-1 flex mb-5 p-2 rounded-[50px]">
          <button
            className={`px-3 py-1 ${
              !NavbarButtons.bold ? "bg-gray-200" : "bg-slate-500 text-white"
            } rounded-[50px] h-[40px] w-[40px]`}
            onClick={(event) => {
              event.preventDefault();
              setNavbarButtons({ ...NavbarButtons, bold: !NavbarButtons.bold });
            }}
          >
            B
          </button>
          <button
            className={`px-3 py-1 ${
              !NavbarButtons.italic ? "bg-gray-200" : "bg-slate-500 text-white"
            } rounded-[50px] h-[40px] w-[40px]`}
            onClick={(event) => {
              event.preventDefault();
              setNavbarButtons({
                ...NavbarButtons,
                italic: !NavbarButtons.italic,
              });
            }}
          >
            i
          </button>
          <button
            className={`px-3 py-1 ${
              !NavbarButtons.underline
                ? "bg-gray-200"
                : "bg-slate-500 text-white"
            } rounded-[50px] h-[40px] w-[40px] underline`}
            onClick={(event) => {
              event.preventDefault();
              setNavbarButtons({
                ...NavbarButtons,
                underline: !NavbarButtons.underline,
              });
            }}
          >
            U
          </button>
        </div>

        <div className="p-5 min-h-[90vh] bg-gray-200 rounded-[10px]">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              if (event.key === "&") {
                event.preventDefault();
                editor.insertText("and");
              }
              if (NavbarButtons.bold) {
                Editor.addMark(editor, "bold", true);
              } else if (!NavbarButtons.bold) {
                Editor.addMark(editor, "bold", false);
              }
              if (NavbarButtons.italic) {
                Editor.addMark(editor, "italic", true);
              } else if (!NavbarButtons.italic) {
                Editor.addMark(editor, "italic", false);
              }
              if (NavbarButtons.underline) {
                Editor.addMark(editor, "underline", true);
              } else if (!NavbarButtons.underline) {
                Editor.addMark(editor, "underline", false);
              }
              if (event.ctrlKey && event.key == "b") {
                event.preventDefault();
                setNavbarButtons({
                  ...NavbarButtons,
                  bold: !NavbarButtons.bold,
                });
              }
              if (event.ctrlKey && event.key == "i") {
                event.preventDefault();
                setNavbarButtons({
                  ...NavbarButtons,
                  italic: !NavbarButtons.italic,
                });
              }
              if (event.ctrlKey && event.key == "u") {
                event.preventDefault();
                setNavbarButtons({
                  ...NavbarButtons,
                  underline: !NavbarButtons.underline,
                });
              }
              //   switch (event.key) {
              //     case "`": {
              //       event.preventDefault();
              //       CustomEditor.toggleCodeBlock(editor);
              //       break;
              //     }

              //     case "b": {
              //       event.preventDefault();
              //       setNavbarButtons({
              //         ...NavbarButtons,
              //         bold: !NavbarButtons.bold,
              //       });

              //       break;
              //     }
              //   }
            }}
          />
        </div>
      </Slate>
    </div>
  );
};

export default TextEditor;
