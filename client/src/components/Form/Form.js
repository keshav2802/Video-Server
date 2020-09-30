import React from 'react';
import './Form.css';
import NavBar from '../NavBar/NavBar';

const Form = (props) => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="container mt-5">
        <div id="login-row" className="row justify-content-center align-items-center">
          <div id="login-column" className="col-md-6 py-3">
            <div id="login-box" className="col-md-12">
              <form
                id="login-form"
                className="form"
                method="post"
                onSubmit={props.onSubmit}>
                {props.children}
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Form;