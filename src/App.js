import React, { Component } from 'react';
import GithubView from './containers/GithubView/GithubView';
import { BrowserRouter } from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL} >
        <GithubView />
     </BrowserRouter>
    );
  }
}

export default App;
