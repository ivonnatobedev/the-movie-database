import React, { Component } from "react";
import Header from "../Header";
import { Route, Switch } from "react-router";
import Home from "../Home";
import Details from "../Details";
import LoadingBar from "../LoadingBar";
import ReduxToastr from "react-redux-toastr";

class Main extends Component {
  render() {
    return (
      <main>
        <LoadingBar/>
        <Header/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/:id" component={Details}/>
          </Switch>
        </div>
        <ReduxToastr
          preventDuplicates
          position="bottom-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </main>
    );
  }
}

export default Main;