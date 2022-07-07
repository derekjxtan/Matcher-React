import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Label, Button, Col } from "reactstrap";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

function EditMatchPage(props) {
    const { matchId } = useParams();
    const navigate = useNavigate();

    return (
        <EditMatch match={props.AllMatches.matches.filter((match) => match._id === matchId)[0]} putSingleMatch={props.putSingleMatch} navigate={navigate}/>
    );
}

class EditMatch extends Component {
    constructor(props) {
        super(props);

        this.editMatch = this.editMatch.bind(this);
        this.getDefaultItems = this.getDefaultItems.bind(this);
    }

    editMatch(event) {
        var resp = {};
        if (this.name.value !== "") {
            resp.name = this.name.value;
        };
        if (this.description.value !== "") {
            resp.description = this.description.value;
        };
        if (this.set1label.value !== "") {
            resp.set1label = this.set1label.value;
        };
        if (this.set1items.value !== "") {
            resp.set1items = this.set1items.value;
        };
        if (this.set2label.value !== "") {
            resp.set2label = this.set2label.value;
        };
        if (this.set2items.value !== "") {
            resp.set2items = this.set2items.value;
        };
        this.props.putSingleMatch(this.props.match._id, resp);
        alert(JSON.stringify(JSON.stringify(resp)));
        event.preventDefault();
        this.props.navigate('/matches', {replace: true});
    }

    getDefaultItems(array) {
        var string = "";
        for (var i = 0; i < array.length; i++) {
            string += array[i] + '\n';
        }
        return string;
    }

    // TO BE IMPLEMENTED
    cancel(event) {
        event.preventDefault();
    }

    render() {
        const PageBreadcrumb = () => (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home' className='link'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/matches' className='link'>Matches</Link></BreadcrumbItem>
                <BreadcrumbItem active>Edit</BreadcrumbItem>
            </Breadcrumb>
        );

        const PageHeader = () => (
            <div className='row-content'>
                <h1>Edit Match.</h1>
                <p>Edit the selected Match. Change only the parts that you want to be changed</p>
            </div>
        );

        const EditMatchForm = () => (
            <div className="row-last">
                <h3>Match ID: {this.props.match._id}</h3>
                <h4>Changeable Fields:</h4>
                <Form onSubmit={this.editMatch}>
                    <FormGroup>
                        <Label for="name"><h3>Match Name:</h3></Label>
                        <Input type='text' name='name' id='name' defaultValue={this.props.match.name} innerRef={(input) => this.name = input}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="description"><h3>Match Description:</h3></Label>
                        <Input type='textarea' rows='3' name='description' id='description' defaultValue={this.props.match.description} innerRef={(input) => this.description = input}/>
                    </FormGroup>
                    <h1>Set 1:</h1>
                    <p>This is the set of people/items that will be choosing the items in Set 2.</p>
                    <FormGroup>
                        <Label for="set1label"><h3>Label:</h3></Label>
                        <Input type='text' name='set1label' id='set1label' defaultValue={this.props.match.set1label} innerRef={(input) => this.set1label = input}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="set1items"><h3>Items:</h3></Label>
                        <Input type='textarea' rows='5' name='set1items' id='set1items' defaultValue={this.getDefaultItems(this.props.match.set1items)} innerRef={(input) => this.set1items = input}/>
                    </FormGroup>
                    <h1>Set 2:</h1>
                    <p>This is the set of people/items that will be choosen by Set 1.</p>
                    <FormGroup>
                        <Label for="set2label"><h3>Label:</h3></Label>
                        <Input type='text' name='set2label' id='set2label' defaultValue={this.props.match.set2label} innerRef={(input) => this.set2label = input}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="set2items"><h3>Items:</h3></Label>
                        <Input type='textarea' rows='5' name='set2items' id='set2items' defaultValue={this.getDefaultItems(this.props.match.set2items)} innerRef={(input) => this.set2items = input}/>
                    </FormGroup>
                    <FormGroup row>
                        <Col md={12}  className='d-flex justify-content-end'>
                            <Button color='secondary' className="me-3" onClick={this.cancel}>Cancel</Button>
                            <Button color='primary' type="submit" className="float-end"><FontAwesomeIcon icon={faPencil} /> Submit Changes</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>

        );

        return (
            <div className="container">
                <PageBreadcrumb />
                <PageHeader />
                <EditMatchForm />
                {/* <EditMatchForm match={this.props.AllMatches.matches.filter((match) => match._id === this.props.match.params.matchId)[0]}/> */}
            </div>
        )
    }
}

export default EditMatchPage;