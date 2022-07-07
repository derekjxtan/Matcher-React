import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

function MatchInputSubmitPage(props) {
    const navigate = useNavigate();

    return (
        <MatchInputSubmitForm SingleMatch={props.SingleMatch} postSingleResponse={props.postSingleResponse} navigate={navigate}/>
    );
}

class MatchInputSubmitForm extends Component {
    constructor(props) {
        super(props);

        this.submitInput = this.submitInput.bind(this);
    }

    submitInput = (event) => {
        var children = []
        for (var ele of document.querySelectorAll('input[type=checkbox]:checked')) {
            children.push(ele.id);
        }
        const resp = JSON.stringify({parent: this.set1.value, children: children});
        alert(resp);
        console.log(resp)
        this.props.postSingleResponse(this.props.SingleMatch.match._id, resp);
        event.preventDefault();
        this.props.navigate('/search', {replace: true});
    }

    render() {
        const PageBreadcrumb = () => (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home' className='link'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/search' className='link'>Search</Link></BreadcrumbItem>
                <BreadcrumbItem active>Input</BreadcrumbItem>
            </Breadcrumb>
        );

        const PageHeader = () => (
            <div className='row-content'>
                <h1>Submit.</h1>
                <p>Submit your inputs accordingly.</p>
            </div>
        );

        const MatchInputForm = ({match}) => (
            <div className="row-last">
                <h3>Match ID: {match._id}</h3>
                <h5>{match.name}</h5>
                <p>{match.description}</p>
                <Form onSubmit={this.submitInput}>
                    <FormGroup>
                        <Label for="set1"><h3>{match.set1label}:</h3></Label>
                        <p>Select which of the following applies to you:</p>
                        <Input type='select' name='set1' id='set1' innerRef={(input) => this.set1 = input}>
                            <option value='Choose 1' hidden>Choose 1</option>
                            {
                                match.set1items.map((option) => {
                                    return (
                                        <option value={option} key={option}>{option}</option>
                                    );
                                })
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label><h3>{match.set2label}:</h3></Label>
                        <p>Choose from the listed</p>
                        <ul className="no-bullets">
                            {
                                match.set2items.map((option) => {
                                    return (
                                        <li>
                                            <Label>
                                                <h5>
                                                    <Input type='checkbox' id={option} key={option} value={option}/>
                                                    {' '}{option}
                                                </h5>
                                            </Label>
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    </FormGroup>
                    <FormGroup>
                        <Button color='primary' type="submit"><FontAwesomeIcon icon={faUpload}/> Submit Response</Button>
                    </FormGroup>
                </Form>
            </div>
        );
        
        return (
            <div className="container">
                <PageBreadcrumb />
                <PageHeader />
                {
                    this.props.SingleMatch.match ?
                    <MatchInputForm match={this.props.SingleMatch.match}/>
                    :
                    <div>Match does not exist</div>
                }
                
            </div>
        );
    }
}

export default MatchInputSubmitPage;