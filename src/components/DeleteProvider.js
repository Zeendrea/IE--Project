import React from 'react';
import ServiceProviderService from '../ServiceProviderService';

function DeleteProvider({ providerId, onDelete }) {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this provider?')) {
            ServiceProviderService.deleteProvider(providerId)
                .then(() => {
                    alert('Provider deleted successfully!');
                    if (onDelete) onDelete();
                })
                .catch(error => alert('Deletion failed: ' + error.message));
        }
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete Provider</button>
        </div>
    );
}

export default DeleteProvider;
