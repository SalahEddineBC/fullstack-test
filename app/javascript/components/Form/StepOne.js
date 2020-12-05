import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import { useState } from 'react';
import StepTwo from './StepTwo';
export default ({ nextStep, ...props }) => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [lastName, setLastName] = useState('');
    const [focus, setFocus] = useState([false, false, false])
    const focusMe = (id) => {
        const f = [...focus]
        f[id] = true
        setFocus(f)
    }
    const submit = (e) => {
        e.preventDefault();
        let notValid = false;
        if (email == '') {
            notValid = true;
            focusMe(2)
        }
        if (lastName == '') {
            focusMe(1)
            notValid = true;
        } if (firstName == '') {
            focusMe(0)
            notValid = true;
        }
        if (!notValid) {
            nextStep({
                "uid": email,
                "last_name": lastName,
                "first_name": firstName
            })
        }

    }
    const validEmail = (e) => {
        if (e !== "") {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (re.test(String(email).toLowerCase())) {
                return true;
            }
        }

        return false
    }
    return (<div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <Form>
            <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter your first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    onFocus={(e) => {
                        focusMe(0)
                    }}
                    invalid={focus[0] && firstName == ''} />
                {focus[0] && firstName == '' && <FormFeedback>Can't be empty</FormFeedback>}
            </FormGroup>
            <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    onFocus={(e) => { focusMe(1) }}
                    invalid={focus[1] && lastName == ''} />
                {focus[1] && lastName == '' && <FormFeedback>Can't be empty</FormFeedback>}

            </FormGroup>

            <FormGroup>
                <Label for="email">Email</Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={(e) => { focusMe(2) }}
                    invalid={focus[2] && validEmail(email) === false} />
                {focus[2] && validEmail(email) === false && <FormFeedback>Wrong format</FormFeedback>}
            </FormGroup>
            <Button onClick={submit}>Next</Button>
        </Form>
    </div>
    )
};