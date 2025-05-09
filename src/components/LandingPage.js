import React from 'react';
import Navbar from './Navbar';
import './LandingPage.css';
import jobImage from '../assets/B6_5.png.png';
import Section2Image from '../assets/section2.png'
import { FaBell, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'

const LandingPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out', 
      once: true, 
    });
  }, []);
  return (
    <div className="landing-page">
      <Navbar />
      <section className="main-section" id="home">
        <div className="text-container" data-aos="fade-up">
          <h1 className="main-heading">Connect with Local Services Instantly</h1>
          <p className="description">Jobflex connects you with trusted local service providers for <br/>quick
            and easy bookings to meet your everyday needs
          </p>
          <br/>
          <RouterLink to="/login" className="get-started-button" style={{textDecoration:'none'}}>Get started</RouterLink>
        </div>

        <div className="dog-image" data-aos="fade-left">
          <img src={jobImage} alt="Dog" className="dog-img"/>
        </div>
      </section>
      
      <section className="about-section" id="about">

        <div className="about-image" data-aos="fade-right">
          <img src={Section2Image} alt="section-image"/>
        </div>

        <div className="about-container" data-aos="fade-up">
          <div className="about-heading-card about-card">
            <h2 className="about-heading">Finding Trusted Local Services Made Easy</h2>
          </div>
          <div className="about-description-card about-card">
          <p id="about-description"> Jobflex is your go-to platform for booking trusted local services. 
            Whether you need a plumber, a handyman for a quick fix, or event assistance 
            for just one day, Jobflex connects you with skilled professionals in your 
            community. Jobflex is dedicated to helping people find reliable service 
            providers for immediate and short-term needs.
          </p>
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <h2 className="services-heading">Our Services</h2>
        <p className="services-heading-description" style={{color: '#767676'}}>Discover a variety of trusted local 
          services tailored to your needs, all easily accessible and bookable through our platform.</p>
          <br></br>
        <div className="services-cards">

          <div className="service-card">
            <FaCalendarAlt className="service-card-icon schedule-icon" />
            <h3 className="service-card-heading">Easy Booking and Scheduling</h3>
            <p className="service-card-description">
              Seamlessly book services directly through our platform with clear availability schedules and instant confirmations.
            </p>
          </div>

          <div className="service-card">
            <FaStar className="service-card-icon star-icon" />
            <h3 className="service-card-heading">Rating and Review System</h3>
            <p className="service-card-description">
              Ensure quality by checking and reviews 
              before booking. Providers can also benefit
              from feedback to improve and build trust. 
            </p>
          </div>

          <div className="service-card">
            <FaBell className="service-card-icon bell-icon" />
            <h3 className="service-card-heading">Service Booking Reminders</h3>
            <p className="service-card-description">
              Receive timely reminders for upcoming bookings and
               appointments, helping you manage your schedule.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <p>&copy; 2024 Trabahanap. All rights reserved.</p>
          </div>
          <div className="footer-right">
            <ul className="footer-links">
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-of-service">Terms of Service</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;