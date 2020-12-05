import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import { useState } from 'react';
export default ({ nextStep = (e) => { }, ...props }) => {
    const [message, setMessage] = useState('');
    const [focus, setFocus] = useState(false)
    const submit = (e) => {
        e.preventDefault();

        if (message != '') {
            nextStep({ message_text: message })
        }
        else {
            setFocus(true)
        }

    }
    return (<div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
        <Form>
            <FormGroup>
                <Label for="message">Message</Label>
                <Input
                    type="textarea"
                    name="message"
                    id="message"
                    placeholder="Type your text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={(e) => {
                        setFocus(true)
                    }}
                    invalid={focus && message == ''} />
                {focus && message == '' && <FormFeedback>Can't be empty</FormFeedback>}
            </FormGroup>
            <Button onClick={submit}>Submit</Button>
        </Form>
    </div>
    )
};