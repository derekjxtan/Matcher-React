import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Button, Table } from "reactstrap";
import { Link, useParams, useNavigate } from 'react-router-dom';

function ResultsPage(props) {
    const { matchId } = useParams();
    const navigate = useNavigate();

    // if (!props.AllMatches.matches.length) {
    //     navigate('/matches', {replace: true});
    //     return (
    //         <div />
    //     );
    // }

    return (
        <Results match={props.AllMatches.matches.filter((match) => match._id === matchId)[0]} fetchAllMatches={props.fetchAllMatches} fetchResults={props.fetchResults} />
    );
}

class Results extends Component {
    constructor(props) {
        super(props);

        this.handleGenerateResults = this.handleGenerateResults.bind(this);
    }
    
    // TO BE Implemented
    handleGenerateResults(event) {
        this.props.fetchResults(this.props.match._id);
        event.preventDefault();
    }

    componentDidUpdate() {
        this.props.fetchAllMatches();
    }

    render() {
        const PageBreadcrumb = () => (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home' className='link'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/matches' className='link'>Matches</Link></BreadcrumbItem>
                <BreadcrumbItem active>Results</BreadcrumbItem>
            </Breadcrumb>
        );

        const PageHeader = () => (
            <div className='row-content'>
                <h1>View Match Results.</h1>
                <p>View the match results here.</p>
            </div>
        );

        const Results = () => (
            <div className="row-last">
                <h1>{this.props.match.name}</h1>
                <h5>{this.props.match._id}</h5>
                {
                    this.props.match.response.length === 0 
                        ?
                        <h5 className="mt-4">No Responses Submmitted</h5>
                        :
                        <div>
                            <div className="d-flex justify-content-left align-items-center"><Button color="primary" onClick={this.handleGenerateResults}>Click here to generate results</Button></div>
                            <Table className="mt-4">
                                <thead>
                                    <tr style={{color: "white", "fontSize": "20px"}}>
                                        <th>{this.props.match.set1label}</th>
                                        <th>{this.props.match.set2label}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.props.match.result.map((result) => {
                                        return (
                                            <tr key={result.parent} style={{color: 'white'}}>
                                                <td>{result.parent}</td>
                                                <td>{result.child}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>
                }
            </div>
        );

        return (
            <div className="container">
                <PageBreadcrumb />
                <PageHeader />
                <Results />
            </div>
        )
    }
}

export default ResultsPage;