import React from 'react';
import {Route} from 'react-router-dom';
import SignIn from './components/Form/SignIn/SignIn';

function App() {
  return (
    <Route exact path="/signin" component={SignIn} />
  );
}

export default App;
