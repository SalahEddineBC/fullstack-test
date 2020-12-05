import React from "react";
import { Link } from "react-router-dom";
import { Button } from 'reactstrap';

export default (props) => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Feedback Platofrm</h1>
        <p className="lead">
          You can submit your feedback via this platform, click on the Submit to fill your feedback form
        </p>
        <hr className="my-4" />
        <Button color="primary" onClick={()=>props.history.push('/feedback/new')}>Submit a feedback</Button>
      </div>
    </div>
  </div>
);