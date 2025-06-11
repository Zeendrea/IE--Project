import React, { useState } from 'react';
import ServiceProviderService from '../ServiceProviderService';

function AddProvider({ toggleModal }) {
    const [provider, setProvider] = useState({ serviceType: '', rating: '', verifiedStatus: 'Verified' });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProvider({ ...provider, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        ServiceProviderService.postProvider(provider).then(() => {
            alert('Provider added successfully!');
            toggleModal();
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Service Type:</label>
            <input type="text" name="serviceType" value={provider.serviceType} onChange={handleInputChange} />

            <label>Rating:</label>
            <input type="text" name="rating" value={provider.rating} onChange={handleInputChange} />

            <label>Verified Status:</label>
            <select name="verifiedStatus" value={provider.verifiedStatus} onChange={handleInputChange}>
                <option value="Verified">Verified</option>
                <option value="Not verified">Not verified</option>
            </select>

            <div className="button-group">
                <button type="submit">Add Provider</button>
                <button type="button" style ={{backgroundColor:"red"}} className="cancel-button" onClick={toggleModal}>Cancel</button>
            </div>
        </form>
    );
}

export default AddProvider;
