import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Button, Table } from "reactstrap";
import { Link, useParams, useNavigate } from 'react-router-dom';

function ResponsesPage(props) {
    const { matchId } = useParams();
    const navigate = useNavigate();

    if (!props.AllMatches.matches.length) {
        navigate('/matches', {replace: true});
        return (
            <div />
        );
    }

    return (
        <Responses match={props.AllMatches.matches.filter((match) => match._id === matchId)[0]} deleteAllResponses={props.deleteAllResponses} deleteSingleResponse={props.deleteSingleResponse}/>
    );
}

class Responses extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteAll = this.handleDeleteAll.bind(this);
    }
    
    handleDeleteAll(event) {
        if (this.props.match.response.length === 0) {
            alert("There are no responses to delete")
        }
        else {
            this.props.deleteAllResponses(this.props.match._id);
        }
        event.preventDefault();
    }

    render() {
        const PageBreadcrumb = () => (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home' className='link'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/matches' className='link'>Matches</Link></BreadcrumbItem>
                <BreadcrumbItem active>Responses</BreadcrumbItem>
            </Breadcrumb>
        );

        const PageHeader = () => (
            <div className='row-content'>
                <h1>View Match Responses.</h1>
                <p>View all submitted responses to your match here.</p>
            </div>
        );

        const Responses = () => (
            <div className="row-last">
                <h1>{this.props.match.name}</h1>
                <h5>{this.props.match._id}</h5>
                <Table>
                    <thead>
                        <tr style={{color: "white", "fontSize": "20px"}}>
                            <th>ID:</th>
                            <th>{this.props.match.set1label}</th>
                            <th>{this.props.match.set2label}</th>
                            <td><Button color="danger" onClick={this.handleDeleteAll}>Delete All</Button></td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.match.response.map((resp) => {
                            return (
                                <tr key={resp._id} style={{color: 'white'}}>
                                    <td>{resp._id}</td>
                                    <td>{resp.parent}</td>
                                    <td>{resp.children.toString()}</td>
                                    <td><Button color="danger" onClick={() => this.props.deleteSingleResponse(this.props.match._id, resp._id)}>Del</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        );

        return (
            <div className="container">
                <PageBreadcrumb />
                <PageHeader />
                <Responses />
            </div>
        )
    }
}

export default ResponsesPage;