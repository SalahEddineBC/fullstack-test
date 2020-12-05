import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import { useState } from 'react';
import StepTwo from './StepTwo';
import StepOne from './StepOne';
export default (props) => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState({});
    const submitForm = (formData) => {
        const token = document.querySelector('meta[name="csrf-token"]').content;
        console.log(token);
        return fetch(`/feedback`, {
            method: 'POST',
            headers: {
                "X-CSRF-Token": token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                feedback: formData
            })
        }).then(function (response) {
            if (response.status >= 400 && response.status < 600) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
    }
    if (step == 0) {
        return <StepOne nextStep={(values) => {
            setStep(1)
            setData({ ...data, ...values })
        }} />
    }
    if (step == 1) {
        return <StepTwo
            nextStep={(values) => {
                submitForm({ ...data, ...values }).then(e => {
                    setStep(2)
                }).catch(e => setStep(3))
            }}
        />
    }
    if (step == 2) {
        return (<div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
            <div className="jumbotron jumbotron-fluid bg-transparent">
                <div className="container secondary-color">
                    <h1 className="display-4">Thank you </h1>
                    <p className="lead">
                        Your feedback was submitted sucessfully
            </p>
                    <hr className="my-4" />
                    <Button color="primary" onClick={() => setStep(0)}>Submit a new feedback</Button>
                </div>
            </div>
        </div>)
    }
    if (step == 3) {
        return (<div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
            <div className="jumbotron jumbotron-fluid bg-transparent">
                <div className="container secondary-color">
                    <h1 className="display-4">Failed </h1>
                    <p className="lead">
                        We Werent able to submit your feedback
            </p>
                    <hr className="my-4" />
                    <Button color="primary" onClick={() => setStep(0)}>Retry</Button>
                </div>
            </div>
        </div>)
    }
}