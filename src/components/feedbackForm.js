import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Label, Button, Col } from "reactstrap";
import { Link } from 'react-router-dom';

class FeedbackForm extends Component {
    constructor(props) {
        super(props);

        this.submitFeedback = this.submitFeedback.bind(this);
    }

    submitFeedback(event) {
        const resp = JSON.stringify({
            name: this.name.value, 
            type: this.type.value,
            feedback: this.feedback.value
        });
        alert('Feedback: ' + resp);
        event.preventDefault();
    }

    render() {
        const PageBreadcrumb = () => (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home' className='link'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Feedback</BreadcrumbItem>
            </Breadcrumb>
        );

        const PageHeader = () => (
            <div className='row-content'>
                <h1>Feedback.</h1>
                <p>Please submit any Feedback here to improve this project.</p>
            </div>
        );

        const FeedbackForm = () => (
            <div className="row-last">
                <Form onSubmit={this.submitFeedback}>
                    <FormGroup row>
                        <Label for="name" md={2}><h3>Name:</h3></Label>
                        <Col md={10}>
                            <Input type='text' name='name' id='name' placeholder='Name' innerRef={(input) => this.name = input}/>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="type" md={2}><h3>Type:</h3></Label>
                        <Col md={10}>
                            <Input type='select' name='type' id='type' innerRef={(input) => this.type = input}>
                                <option value='Type' hidden>Type</option>
                                <option value='New features'>New features</option>
                                <option value='Improvement to existing features'>Improvement to existing features</option>
                                <option value='Others'>Others</option>
                            </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="feedback" md={2}><h3>Feedback:</h3></Label>
                        <Col md={10}>
                            <Input type='textarea' rows='5' name='feedback' id='feedback' innerRef={(input) => this.feedback = input} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={12}  className='d-flex justify-content-end'>
                            <Button color='primary' type="submit" className="float-end">Submit Feedback</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );

        return (
            <div className="container">
                <PageBreadcrumb />
                <PageHeader />
                <FeedbackForm />
            </div>
        )
    }
};

export default FeedbackForm;