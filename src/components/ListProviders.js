import React, { useEffect, useState } from 'react';
import ServiceProviderService from '../ServiceProviderService';
import UpdateProvider from './UpdateProvider';
import DeleteProvider from './DeleteProvider';
import "./ListProvider.css";

function ListProviders() {
    const [providers, setProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState(null);

    const fetchProviders = () => {
        ServiceProviderService.getAllProviders().then((response) => {
            setProviders(response.data);
        });
    };

    useEffect(() => {
        fetchProviders();
    }, []);

    useEffect(() => {
        console.log(providers);
    }, [providers]);

    const handleUpdate = (updatedProvider) => {
        setProviders((prevProviders) =>
            prevProviders.map((provider) =>
                provider.providerId === updatedProvider.providerId ? updatedProvider : provider
            )
        );
        setSelectedProvider(null); 
    };
    

    const cancelUpdate = () => setSelectedProvider(null);


    return (
        <div className="containerStyle">
            {providers.map((provider) => (
                <div className="provider-card" key={provider.providerId}>
                    <h4>{provider.serviceType}</h4>
                    <p><strong>Rating:</strong> {provider.rating}</p>
                    <p><strong>Verified:</strong> {provider.verifiedStatus === 'Verified' ? 'Yes' : 'No'}</p>
                    <div className="actions">
                        <button
                            style={{ backgroundColor: '#28a745', color: 'white' }}
                            onClick={() => setSelectedProvider(provider.providerId)}
                        >
                            Update
                        </button>
                        <DeleteProvider providerId={provider.providerId} onDelete={fetchProviders}>
                            <button style={{ backgroundColor: '#dc3545', color: 'white' }}>Delete</button>
                        </DeleteProvider>
                    </div>
                </div>
            ))}
            {selectedProvider && (
                <div className="modal-overlay">
                    <UpdateProvider
                        providerId={selectedProvider}
                        onUpdate={handleUpdate}
                        cancelUpdate={cancelUpdate}
                    />
                </div>
            )}
        </div>
    );
}

export default ListProviders;
