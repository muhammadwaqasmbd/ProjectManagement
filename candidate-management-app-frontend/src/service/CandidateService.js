import axios from 'axios'

const CANDIDATE = 'candidates'
const CANDIDATE_API_URL = 'http://localhost:8989'
const CANDIDATE_MANAGEMENT_API_URL = `${CANDIDATE_API_URL}/candidatemanagement/${CANDIDATE}`

class CandidateService {

    retrieveAllCandidates() {
        return axios.get(`${CANDIDATE_MANAGEMENT_API_URL}`);
    }

    retrieveCandidate(id) {
        return axios.get(`${CANDIDATE_MANAGEMENT_API_URL}/${id}`);
    }

    deleteCandidate(id) {
        return axios.delete(`${CANDIDATE_MANAGEMENT_API_URL}/delete/${id}`);
    }

    updateCandidate(id, candidate) {
        return axios.put(`${CANDIDATE_MANAGEMENT_API_URL}/update/${id}`, candidate);
    }

    createCandidate(candidate) {
        return axios.post(`${CANDIDATE_MANAGEMENT_API_URL}/create`, candidate);
    }
	
	getPieChartData()	{
		return axios.get(`${CANDIDATE_MANAGEMENT_API_URL}/pieChartData`);
	}
	
	getBarChartData()	{
		return axios.get(`${CANDIDATE_MANAGEMENT_API_URL}/barChartData`);
	}
	
	retrieveCandidates()	{
		return axios.get(`${CANDIDATE_MANAGEMENT_API_URL}/candidatesList`);
	}

}

export default new CandidateService()
