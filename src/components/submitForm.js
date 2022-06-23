import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { Link } from 'react-router-dom';

class SubmitForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idExists: false
        };

        this.search = this.search.bind(this);
        this.matchFound = this.matchFound.bind(this);
    }

    search(event) {
        // make a call to the server, 
        // if id exists then render the form for submission
        // otherwise just load input matchid again
        const resp = JSON.stringify({matchid: this.matchid.value});
        alert('Search: ' + resp);
        this.matchFound();
        event.preventDefault();
    }

    matchFound() {
        this.setState({
            idExists: !this.state.idExists
        })
    }

    render() {
        const PageBreadcrumb = () => (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home' className='link'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Submit</BreadcrumbItem>
            </Breadcrumb>
        );

        const PageHeader = () => (
            <div className='row'>
                <h1>Submit.</h1>
                <p>Enter the Match ID given to you into the form below.</p>
            </div>
        );

        const IDForm = () => (
            <div className="row-last">
                <Form onSubmit={this.search}>
                    <FormGroup>
                        <Label for="matchid"><h3>Match ID:</h3></Label>
                        <Input type='text' name='matchid' id='matchid' placeholder='Match ID' innerRef={(input) => this.matchid = input}/>
                    </FormGroup>
                    <FormGroup>
                        <Button color='primary' type="submit">Search</Button>
                    </FormGroup>
                </Form>
            </div>
        );

        const MatchDetailsForm = () => (
            <div className="row-last">
                <h1>Hello, implement this form later</h1>
            </div>
        );
        
        return (
            <div className="container">
                <PageBreadcrumb />
                <PageHeader />
                {!this.state.idExists ?
                    <IDForm />
                    :
                    <MatchDetailsForm />
                }
            </div>
        );
    }
}

export default SubmitForm;