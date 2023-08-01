import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import TextEditor from "../Components/TextEditor/TextEditor";
import SignUp from "../Pages/SignUp";
import Login from "../Pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/document",
    element: <TextEditor />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Editor",
    element: <TextEditor />,
  },
]);

export default router;
