import { Link, useNavigate } from "react-router-dom";
// import TextEditor from "./Components/TextEditor/TextEditor";
import React, { useEffect } from "react";
import Header from "./Components/Header/Header";
import Templates from "./Components/Templates/Templates";

const App = () => {
  return (
    <div>
      <Header />
      <Templates />
      {/* <Link to="/document">Hello World</Link>; */}
    </div>
  );
};

export default App;
