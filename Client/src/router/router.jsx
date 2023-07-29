import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TextEditor from "../Components/TextEditor/TextEditor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/document",
    element: <TextEditor />,
  },
]);

export default router;
