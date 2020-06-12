import React, { Component} from 'react';
import CandidateService from '../../service/CandidateService';

const CANDIDATES = 'candidates'

class CandidatesComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            candidates: [],
            message: null,
            search: ''
        }
        this.deleteCandidateClicked = this.deleteCandidateClicked.bind(this)
        this.updateCandidateClicked = this.updateCandidateClicked.bind(this)
        this.addCandidateClicked = this.addCandidateClicked.bind(this)
        this.refreshCandidates = this.refreshCandidates.bind(this)
    }

    componentDidMount() {
        this.refreshCandidates();
    }

    refreshCandidates() {
        CandidateService.retrieveAllCandidates()
            .then(
                response => {
                    console.log(response);
                    this.setState({ candidates: response.data })
					this.props.history.push(`/`)
                }
            )
    }

    deleteCandidateClicked(id) {
        CandidateService.deleteCandidate(id)
            .then(
                response => {
                    this.setState({ message: `Candidate ${id} deleted successfully` })
                    this.refreshCandidates()
                }
            )

    }

    addCandidateClicked() {
        this.props.history.push(`/candidates/-1`)
    }

    updateCandidateClicked(id) {
        console.log('update ' + id)
        this.props.history.push(`/candidates/${id}`)
    }

    renderCandidate = candidate => {
        return (
            <tr key={candidate.id}>
                <td style={{ textAlign: 'center' }}>{candidate.name}</td>
                <td style={{ textAlign: 'center' }}>{candidate.phone}</td>
                <td style={{ textAlign: 'center' }}>{candidate.email}</td>
                <td style={{ textAlign: 'center' }}><a href={process.env.PUBLIC_URL + '/Resumes/'+candidate.fileName} download>{candidate.fileName}</a></td>
                <td style={{ textAlign: 'center' }}>
                    <div className="btn-group">
                        <button className="btn btn-primary" onClick={() => this.updateCandidateClicked(candidate.id)}>Edit</button>
                        &nbsp;
                        <button className="btn btn-danger" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteCandidateClicked(candidate.id) }}>Delete</button>
                    </div>
                </td>
                <td></td>
            </tr>
        );
    };

    onchange = e => {
        this.setState({ search: e.target.value });
    };

    render() {
        const { search } = this.state;
        const filteredCandidates = this.state.candidates.filter(candidate => {
            return candidate.fileName.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });
        return (
		<div>
            <div class="card">
              <div class="card-body">
            <div className="container">
                <h3>Candidates</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <div className="container">
                    <table className="table table-striped">
                        <thead >
                            <tr>
								<th style={{ textAlign: 'center' }}>Name</th>
								<th style={{ textAlign: 'center' }}>Phone</th>
								<th style={{ textAlign: 'center' }}>Email</th>
                                <th style={{ textAlign: 'center' }}>Resume</th>
                                <th style={{ textAlign: 'center' }}>Actions</th>
                                <th><button className="btn btn-success" onClick={this.addCandidateClicked}>Add</button></th>
                            </tr>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>
                                    <input
                                        label="Search Candidate"
                                        icon="search"
                                        onChange={this.onchange}
                                    />
                                </th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredCandidates.map(candidate => {
                                return this.renderCandidate(candidate);
                            })}
                        </tbody>
						
                    </table>

                </div>
            </div>
            </div>
            </div>
		</div>
        )
    }
}

export default CandidatesComponent
