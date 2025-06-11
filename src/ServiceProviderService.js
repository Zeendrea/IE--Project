import axios from 'axios';

class ServiceProviderService {
    getAllProviders() {
        return axios.get('http://localhost:8080/getAllProviders')
        
    }

    postProvider(provider) {
        return axios.post('http://localhost:8080/postProviderRecord', provider);
    }

    updateProvider(providerId, updatedProviderData) {
        return axios.put(`http://localhost:8080/updateProviderDetails?providerId=${providerId}`, updatedProviderData);
    }

    deleteProvider(providerId) {
        return axios.delete(`http://localhost:8080/deleteProviderDetails/${providerId}`);
    }

    // New method for fetching a provider by ID
    getProviderById(providerId) {
        return axios.get(`http://localhost:8080/getProviderDetails/${providerId}`);
    }
}

export default new ServiceProviderService();
