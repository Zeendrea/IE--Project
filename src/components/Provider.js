import React, { useState } from 'react';
import ListProviders from './ListProviders';
import AddProvider from './AddProvider';
import Ellipse7 from '../assets/Ellipse 7.svg';
import './Provider.css';


function Provider() {
  const [showAddProviderModal, setShowAddProviderModal] = useState(false);
 
    // Function to open and close the modal
    const toggleAddProviderModal = () => {
        setShowAddProviderModal(!showAddProviderModal);
    };
 
    return (
        <div className="App">
 
            <div className="heading-container">
                <h2 className="heading">Service Providers</h2>
                <button className="toggle-button" onClick={toggleAddProviderModal}>+</button>
            </div>
 
            <ListProviders />
 
            {showAddProviderModal && (
                <div className="modal-overlay">
                    <AddProvider toggleModal={toggleAddProviderModal} />
                </div>
            )}
 
            
        </div>
  );
}

export default Provider;
