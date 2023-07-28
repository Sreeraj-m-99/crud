import logo from "./logo.svg";
import "./App.css";
import { Provider } from 'react-redux';
import store from "./store/store";
import Main from "./componets/Main";

function App() {
  return <>
    <Provider store={store}> 
    <Main/>
    </Provider>
  </>;
}

export default App;
