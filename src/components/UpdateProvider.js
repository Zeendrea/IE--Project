import React, { useState, useEffect } from 'react';
import ServiceProviderService from '../ServiceProviderService';

function UpdateProvider({ providerId, onUpdate, cancelUpdate }) {
    const [provider, setProvider] = useState({ serviceType: '', rating: '', verifiedStatus: 'Not verified' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProvider() {
            try {
                const response = await ServiceProviderService.getProviderById(providerId);
                setProvider(response.data);
            } catch (error) {
                console.error("Failed to fetch provider:", error);
            } finally {
                setLoading(false);
            }
        }
        if (providerId) fetchProvider();
    }, [providerId]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProvider({ ...provider, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Updating provider with data:', provider);
    
        try {
            await ServiceProviderService.updateProvider(providerId, provider);
            alert('Provider updated successfully!');
            onUpdate(provider);
        } catch (error) {
            alert('Update failed: ' + error.message);
        }
    };
    

    if (loading) return <p>Loading provider details...</p>;

    return (
        <form onSubmit={handleSubmit}>
            <h3>Update Provider</h3>
            <label>Service Type:</label>
            <input
                type="text"
                name="serviceType"
                value={provider.serviceType}
                onChange={handleInputChange}
                required
            />
            <label>Rating:</label>
            <input
                type="number"
                name="rating"
                value={provider.rating}
                onChange={handleInputChange}
                required
            />
            <label>Verified Status:</label>
            <select
                name="verifiedStatus"
                value={provider.verifiedStatus || "Not verified"}
                onChange={handleInputChange}
                required
            >
                <option value="Verified">Verified</option>
                <option value="Not verified">Not verified</option>
            </select>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        borderRadius: '6px',
                        backgroundColor: '#28a745',
                        color: 'white',
                    }}
                >
                    Update Provider
                </button>
                <button
                    type="button"
                    onClick={cancelUpdate}
                    style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        borderRadius: '6px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                    }}
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default UpdateProvider;
