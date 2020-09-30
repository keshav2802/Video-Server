import React from 'react';
import {Route} from 'react-router-dom';
import SignIn from './components/Form/SignIn/SignIn';
import SignUp from './components/Form/SignUp/SignUp';
import Upload from './components/Upload/Upload';

function App() {
  return (
    <React.Fragment>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/upload" component={Upload} />
    </React.Fragment>
  );
}

export default App;
