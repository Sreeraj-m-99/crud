import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import Main from "./componets/Main";
import { BrowserRouter as Router, Route,  Routes } from "react-router-dom";

function App() {
  return (
    <>
    
      <Provider store={store}>
        <Router>
          <Routes>
           <Route path="/" Component={Main}></Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
