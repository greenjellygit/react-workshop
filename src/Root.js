import React, {Component} from 'react';
import {BrowserRouter, Route} from "react-router-dom";
import {rootRoutes} from "./config/routes";
import './styles/index.css';

class Root extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {rootRoutes.map(props => <Route key={props.path} {...props} />)}
        </div>
      </BrowserRouter>
    );
  }
}

export default Root;