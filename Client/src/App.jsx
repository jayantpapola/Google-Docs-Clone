import React, { useEffect } from "react";
import Header from "./Components/Header/Header";
import Templates from "./Components/Templates/Templates";
import { useDispatch } from "react-redux";
import { getAllDocuments } from "./redux/reducer/document";
import RecentDocs from "./Components/RecentDocs/RecentDocs";
import Modal from "./Components/Modal/Modal";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDocuments());
  }, []);

  return (
    <div>
      <Header />
      <Templates />
      <RecentDocs />
      <Modal show/>
      {/* <Link to="/document">Hello World</Link>; */}
    </div>
  );
};

export default App;
