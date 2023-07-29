import { Link, useNavigate } from "react-router-dom";
import TextEditor from "./Components/TextEditor/TextEditor";
import React, { useEffect } from "react";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/SignUp");
  }, []);

  return <Link to="/document">Hello World</Link>;
};

export default App;
