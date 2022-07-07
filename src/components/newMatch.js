import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Label, Button, Col } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus} from '@fortawesome/free-solid-svg-icons';

function NewMatchPage(props) {
    const navigate = useNavigate();

    return (
        <NewMatch postNewMatch={props.postNewMatch} navigate={navigate}/>
    );
}

class NewMatch extends Component {
    constructor(props) {
        super(props);

        this.submitNewMatch = this.submitNewMatch.bind(this)
        this.cancel = this.cancel.bind(this)
    }

    submitNewMatch(event) {
        const resp = {
            name: this.name.value,
            description: this.description.value,
            set1label: this.set1label.value,
            set1items: this.set1items.value,
            set2label: this.set2label.value,
            set2items: this.set2items.value,
        };
        alert('New Match: ' + JSON.stringify(resp));
        this.props.postNewMatch(resp);
        event.preventDefault();
        this.props.navigate('/matches', {replace: true});
    };

    cancel() {
        // clear form contents
    };

    render() {
        const PageBreadcrumb = () => (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home' className='link'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Create New Match</BreadcrumbItem>
            </Breadcrumb>
        );

        const PageHeader = () => (
            <div className='row-content'>
                <h1>Create New Match.</h1>
                <p>Start creating a new match by filling up the form below.</p>
            </div>
        );

        const NewMatchForm = () => (
            <div className="row-last">
                <Form onSubmit={this.submitNewMatch}>
                    <FormGroup>
                        <Label for="name"><h3>Match Name:</h3></Label>
                        <p>Give a name to your new match!</p>
                        <Input type='text' name='name' id='name' placeholder='Name' innerRef={(input) => this.name = input}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description"><h3>Match Description:</h3></Label>
                        <p>Describe your new match!</p>
                        <Input type='textarea' rows='3' name='description' id='description' placeholder='Description' innerRef={(input) => this.description = input}/>
                    </FormGroup>
                    <h1>Set 1:</h1>
                    <p>This is the set of people/items that will be choosing the items in Set 2.</p>
                    <FormGroup>
                        <Label for="set1label"><h3>Label:</h3></Label>
                        <p>Give a name to your first set!</p>
                        <Input type='text' name='set1label' id='set1label' placeholder='Label' innerRef={(input) => this.set1label = input}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="set1items"><h3>Items:</h3></Label>
                        <p>Input the items of your first set! Start a new line for each item.</p>
                        <Input type='textarea' rows='5' name='set1items' id='set1items' placeholder='Items' innerRef={(input) => this.set1items = input}/>
                    </FormGroup>
                    <h1>Set 2:</h1>
                    <p>This is the set of people/items that will be choosen by Set 1.</p>
                    <FormGroup>
                        <Label for="set2label"><h3>Label:</h3></Label>
                        <p>Give a name to your first set!</p>
                        <Input type='text' name='set2label' id='set2label' placeholder='Label' innerRef={(input) => this.set2label = input}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="set2items"><h3>Items:</h3></Label>
                        <p>Input the items of your first set! Start a new line for each item.</p>
                        <Input type='textarea' rows='5' name='set2items' id='set2items' placeholder='Items' innerRef={(input) => this.set2items = input}/>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={12}  className='d-flex justify-content-end'>
                            <Button color='secondary' className="me-3" onClick={this.cancel}>Cancel</Button>
                            <Button color='primary' type="submit" className="float-end"><FontAwesomeIcon icon={faFolderPlus} /> Create new Match</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        );
        
        return (
            <div className="container">
                <PageBreadcrumb />
                <PageHeader />
                <NewMatchForm />
            </div>
        );
    }
}

export default NewMatchPage;