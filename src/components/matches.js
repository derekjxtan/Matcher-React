import React, {Component} from "react";
import { Breadcrumb, BreadcrumbItem, Button, Card, CardHeader, CardBody } from "reactstrap";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPencil, faEye } from '@fortawesome/free-solid-svg-icons';

class Matches extends Component {
    constructor(props) {
        super(props)
    };

    componentDidMount () {
        this.props.fetchAllMatches();
    }
 
    render() {
        const PageBreadcrumb = () => (
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home' className='link'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem active>Matches</BreadcrumbItem>
            </Breadcrumb>
        );

        const PageHeader = () => (
            <div className='row-content'>
                <h1>Matches.</h1>
                <p>View all your matches here.</p>
            </div>
        );

        const UserMatches = () => (
            <div>
                {this.props.AllMatches.matches.map((match) => {
                    return (
                        <Card key={match._id}>
                            <CardHeader className="d-flex">
                                <h3>{match.name}</h3>
                                <div className="ms-auto">
                                    <Button color="danger" onClick={() => this.props.deleteSingleMatch(match._id)} className='me-2'><FontAwesomeIcon icon={faTrash}/> Delete</Button>
                                    <Link to={`/matches/${match._id}/edit`} className='btn btn-primary me-2'><FontAwesomeIcon icon={faPencil}/> Edit</Link>
                                    <Link to={`/matches/${match._id}/responses`} className='btn btn-success me-2'><FontAwesomeIcon icon={faEye}/> View Responses</Link>
                                    <Link to={`/matches/${match._id}/results`} className='btn btn-success'><FontAwesomeIcon icon={faEye}/> View Results</Link>
                                </div>
                            </CardHeader>
                            <CardBody>
                                <h5 className='card-title'>{match.description}</h5>
                                <p>
                                    <b>ID:</b> {match._id}
                                    <br></br>
                                    <b>Created at:</b> {match.createdAt}
                                    <br></br>
                                    <b>Set 1 Label:</b> {match.set1label}
                                    <br></br>
                                    <b>Set 1 Items:</b> {match.set1items.toString()}
                                    <br></br>
                                    <b>Set 2 Label:</b> {match.set2label}
                                    <br></br>
                                    <b>Set 2 Items:</b> {match.set2items.toString()}
                                    <br></br>
                                    <b>Results generated:</b> {match.solved.toString()}
                                </p>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>
        );

        return (
            <div className="container">
                <PageBreadcrumb />
                <PageHeader />
                {
                    !this.props.AllMatches.matches ?
                    <div></div>
                    :
                    <UserMatches />
                }
            </div>
        );
    }
}

export default Matches;