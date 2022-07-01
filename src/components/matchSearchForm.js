import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { Link } from 'react-router-dom';

class MatchSearchForm extends Component {
    constructor(props) {
        super(props);

        this.search = this.search.bind(this);
    }

    search(event) {
        // make a call to the server, 
        // if id exists then render the form for submission
        // otherwise just load input matchid again
        const resp = JSON.stringify({matchid: this.matchid.value});
        // alert('Search: ' + resp);
        this.props.fetchSingleMatch(this.matchid.value);
        event.preventDefault();
    }

    render() {
        const PageBreadcrumb = () => (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home' className='link'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Search</BreadcrumbItem>
            </Breadcrumb>
        );

        const PageHeader = () => (
            <div className='row-content'>
                <h1>Submit.</h1>
                <p>Enter the Match ID given to you into the form below.</p>
            </div>
        );

        const IDForm = () => (
            <div className="row-last">
                <Form onSubmit={this.search} action='/search/input'>
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
        
        return (
            <div className="container">
                <PageBreadcrumb />
                <PageHeader />
                {
                    this.props.SingleMatch.errMess
                        ?
                        <h1 style={{'color': 'red', 'text-decoration': 'underline'}}>Match not found, Try to search again</h1>
                        :
                        <div />
                }
                <IDForm />
                {
                    this.props.SingleMatch.match 
                        ?
                        <Link to='input' className="btn btn-primary">Match Found, Click to proceed</Link>
                        :
                        <div></div>
                }
            </div>
        );
    }
}

export default MatchSearchForm;