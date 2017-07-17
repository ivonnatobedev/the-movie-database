import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from "../store";
import { BrowserRouter } from "react-router-dom";
import Main from "./Main/index";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Main/>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
