import React, { useState, useEffect } from 'react';
import serviceImage from '../assets/wallpaper.jpg';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ServiceList = ({ searchQuery = ""}) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/services');
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    const filteredServices = services.filter(
        (service) =>
            (service.title?.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (service.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const styles = {
        container: {
            margin: '20px',
            padding: '0 10px',
            maxWidth: '1200px',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        heading: {
            fontSize: '2rem',
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: '30px',
            color: '#333',
        },
        list: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            justifyItems: 'center', // Center the cards in each column
        },
        card: {
            backgroundColor: '#fff',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        cardHover: {
            transform: 'translateY(-10px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
        },
        image: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
        },
        cardContent: {
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            height: '100%',
        },
        title: {
            fontSize: '1.3rem',
            fontWeight: '600',
            margin: '0',
            color: '#333',
        },
        price: {
            fontSize: '1.1rem',
            fontWeight: 'bold',
            color: '#007BFF',
        },
        description: {
            fontSize: '1rem',
            color: '#666',
            flexGrow: '1',
        },
        button: {
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '8px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            fontWeight: '500',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.list}>
                {filteredServices.map((service) => (
                    <div
                        key={service.serviceID || service.title}  // Using service.id or fallback to service.title for unique key
                        style={styles.card}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = styles.cardHover.transform;
                            e.currentTarget.style.boxShadow = styles.cardHover.boxShadow;
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                        }}
                    >
                        <img src={service.imageUrl || serviceImage} alt={service.title} style={styles.image} />
                        <div style={styles.cardContent}>
                            <h3 style={styles.title}>{service.title}</h3>
                            <p style={styles.price}>${service.price}</p>
                            <p style={styles.description}>{service.description}</p>
                            <Link
                                    to={{
                                        pathname: `/booking/${service.serviceID}`,
                                        state: {
                                            title: service.title,
                                            description: service.description,
                                            price: service.price,
                                        },
                                    }}
                                    style={{ textDecoration: 'none' }}
                                >
                                    <button style={styles.button}>Book Now</button>
                                </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceList;
