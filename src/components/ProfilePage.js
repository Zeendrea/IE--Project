import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  // Mock user data for demonstration
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main Street, City, State",
    phone: "+1 (555) 123-4567",
    userType: "Job Seeker",
    profileImage: null,
    googleId: null,
    joinDate: "2024-01-15",
    lastLogin: "2025-06-26"
  });

  const [name, setName] = useState(user.name || '');
  const [address, setAddress] = useState(user.address || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(user.profileImage || null);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/homepage';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name cannot be empty';
    if (!address.trim()) newErrors.address = 'Address cannot be empty';
    if (!phone.trim()) newErrors.phone = 'Phone cannot be empty';
    if (!user.googleId && isEditingPassword && !password.trim()) newErrors.password = 'Password cannot be empty';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsUpdateModalOpen(true);
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className={`profile-page ${isDarkMode ? 'dark' : ''}`}>
      <style jsx>{`
        .profile-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          transition: all 0.3s ease;
        }

        .profile-page.dark {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }

        .floating-shapes {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          animation: float 20s infinite linear;
        }

        .shape:nth-child(1) {
          width: 80px;
          height: 80px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape:nth-child(2) {
          width: 120px;
          height: 120px;
          top: 60%;
          right: 10%;
          animation-delay: 7s;
        }

        .shape:nth-child(3) {
          width: 60px;
          height: 60px;
          top: 80%;
          left: 20%;
          animation-delay: 14s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(120deg); }
          66% { transform: translateY(30px) rotate(240deg); }
        }

        .navbar {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 100;
          transition: all 0.3s ease;
        }

        .profile-page.dark .navbar {
          background: rgba(15, 23, 42, 0.95);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .navbar-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 1.75rem;
          font-weight: 700;
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .theme-toggle {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .theme-toggle:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .profile-container {
          max-width: 1000px;
          margin: 2rem auto;
          padding: 0 1rem;
          position: relative;
          z-index: 10;
        }

        .back-button {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.75rem 1.5rem;
          border-radius: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 500;
          color: white;
          transition: all 0.3s ease;
          margin-bottom: 2rem;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.25);
          transform: translateX(-5px);
        }

        .profile-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .profile-page.dark .profile-card {
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .profile-header {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
          padding: 3rem 2rem 6rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .profile-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          opacity: 0.1;
        }

        .profile-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          position: relative;
          z-index: 1;
        }

        .profile-subtitle {
          opacity: 0.9;
          font-size: 1.1rem;
          position: relative;
          z-index: 1;
        }

        .profile-stats {
          display: flex;
          justify-content: center;
          gap: 2rem;
          margin-top: 2rem;
          position: relative;
          z-index: 1;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          display: block;
        }

        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .profile-image-section {
          position: relative;
          margin-top: -4rem;
          display: flex;
          justify-content: center;
          padding: 0 2rem 2rem 2rem;
        }

        .profile-image-container {
          position: relative;
          display: inline-block;
        }

        .profile-avatar {
          width: 140px;
          height: 140px;
          border-radius: 50%;
          border: 6px solid white;
          background: linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          font-weight: 700;
          color: #6b7280;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .profile-avatar:hover {
          transform: scale(1.05);
        }

        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .camera-button {
          position: absolute;
          bottom: 10px;
          right: 10px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          font-size: 1.2rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
        }

        .camera-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(76, 175, 80, 0.6);
        }

        .hidden-input {
          display: none;
        }

        .tabs-container {
          border-bottom: 1px solid #e5e7eb;
          padding: 0 2rem;
        }

        .profile-page.dark .tabs-container {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tabs {
          display: flex;
          gap: 0;
        }

        .tab {
          padding: 1rem 2rem;
          cursor: pointer;
          border-bottom: 3px solid transparent;
          transition: all 0.3s ease;
          font-weight: 500;
          color: #6b7280;
        }

        .profile-page.dark .tab {
          color: #9ca3af;
        }

        .tab.active {
          color: #4CAF50;
          border-bottom-color: #4CAF50;
          background: linear-gradient(to top, rgba(76, 175, 80, 0.05), transparent);
        }

        .tab:hover:not(.active) {
          color: #374151;
          background: rgba(0, 0, 0, 0.02);
        }

        .profile-page.dark .tab:hover:not(.active) {
          color: #d1d5db;
          background: rgba(255, 255, 255, 0.02);
        }

        .tab-content {
          padding: 2rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .form-group {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
        }

        .profile-page.dark .form-label {
          color: #d1d5db;
        }

        .form-input {
          width: 100%;
          padding: 1rem 1.25rem;
          border: 2px solid #e5e7eb;
          border-radius: 1rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
          position: relative;
        }

        .profile-page.dark .form-input {
          background: rgba(15, 23, 42, 0.5);
          border-color: rgba(255, 255, 255, 0.1);
          color: white;
        }

        .form-input:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.1);
          transform: translateY(-2px);
        }

        .form-input:read-only {
          background: #f9fafb;
          color: #6b7280;
          cursor: not-allowed;
        }

        .profile-page.dark .form-input:read-only {
          background: rgba(0, 0, 0, 0.2);
          color: #9ca3af;
        }

        .form-input::placeholder {
          color: #9ca3af;
          opacity: 1;
        }

        .profile-page.dark .form-input::placeholder {
          color: #6b7280;
        }

        .error-message {
          color: #ef4444;
          font-size: 0.875rem;
          margin-top: 0.5rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .google-badge {
          background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          text-align: center;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3);
        }

        .account-info {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-radius: 1.5rem;
          padding: 2rem;
          margin-bottom: 2rem;
        }

        .profile-page.dark .account-info {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.5) 0%, rgba(30, 41, 59, 0.5) 100%);
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .info-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
        }

        .info-content h4 {
          margin: 0;
          font-size: 0.875rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .profile-page.dark .info-content h4 {
          color: #9ca3af;
        }

        .info-content p {
          margin: 0.25rem 0 0 0;
          font-weight: 600;
          color: #1f2937;
          font-size: 1rem;
        }

        .profile-page.dark .info-content p {
          color: #f9fafb;
        }

        .button-group {
          display: flex;
          gap: 1rem;
          margin-top: 3rem;
        }

        .btn {
          padding: 1rem 2.5rem;
          border-radius: 1rem;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
        }

        .btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s;
        }

        .btn:hover::before {
          left: 100%;
        }

        .btn-primary {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(76, 175, 80, 0.6);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .btn-danger {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
        }

        .btn-danger:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.6);
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          z-index: 1000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .modal-overlay.show {
          opacity: 1;
          visibility: visible;
        }

        .modal-content {
          background: white;
          border-radius: 1.5rem;
          max-width: 450px;
          width: 100%;
          transform: scale(0.8) translateY(20px);
          transition: all 0.3s ease;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          overflow: hidden;
        }

        .profile-page.dark .modal-content {
          background: #1e293b;
        }

        .modal-overlay.show .modal-content {
          transform: scale(1) translateY(0);
        }

        .modal-header {
          padding: 2rem 2rem 0 2rem;
          text-align: center;
        }

        .modal-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 0 auto 1rem auto;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .modal-icon.success {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
        }

        .modal-icon.danger {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .profile-page.dark .modal-title {
          color: #f9fafb;
        }

        .modal-body {
          padding: 1rem 2rem 2rem 2rem;
          text-align: center;
          color: #6b7280;
          line-height: 1.6;
        }

        .profile-page.dark .modal-body {
          color: #9ca3af;
        }

        .modal-footer {
          padding: 0 2rem 2rem 2rem;
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .btn-modal {
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
          min-width: 100px;
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
        }

        .profile-page.dark .btn-secondary {
          background: #374151;
          color: #d1d5db;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        .profile-page.dark .btn-secondary:hover {
          background: #4b5563;
        }

        .btn-confirm {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          color: white;
        }

        .btn-confirm:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(76, 175, 80, 0.4);
        }

        .btn-confirm.danger {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        }

        .btn-confirm.danger:hover {
          box-shadow: 0 4px 15px rgba(239, 68, 68, 0.4);
        }

        @media (max-width: 768px) {
          .form-grid, .info-grid {
            grid-template-columns: 1fr;
          }
          
          .button-group {
            flex-direction: column;
          }
          
          .profile-container {
            margin: 1rem auto;
          }
          
          .profile-stats {
            gap: 1rem;
          }
          
          .tabs {
            overflow-x: auto;
          }
          
          .tab {
            white-space: nowrap;
          }
        }
      `}</style>

      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="shape"></div>
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      {/* Navigation Bar */}
      <div className="navbar">
        <div className="navbar-content">
          <div className="logo">Jobflex</div>
          <div className="nav-right">
            <button 
              className="theme-toggle" 
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </div>

      <div className="profile-container">
        <button className="back-button" onClick={handleGoBack}>
          ← Back to Dashboard
        </button>

        <div className="profile-card">
          {/* Profile Header */}
          <div className="profile-header">
            <h1 className="profile-title">Profile Settings</h1>
            <p className="profile-subtitle">Manage your account and preferences</p>
          </div>

          {/* Profile Image Section */}
          <div className="profile-image-section">
            <div className="profile-image-container">
              <div className="profile-avatar">
                {profileImage ? (
                  <img src={profileImage} alt="Profile" />
                ) : (
                  getInitials(name)
                )}
              </div>
              <input
                accept="image/*"
                className="hidden-input"
                id="upload-profile-image"
                type="file"
                onChange={handleProfileImageChange}
              />
              <label htmlFor="upload-profile-image" className="camera-button">
                📷
              </label>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              <div 
                className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                👤 Personal Info
              </div>
              <div 
                className={`tab ${activeTab === 'account' ? 'active' : ''}`}
                onClick={() => setActiveTab('account')}
              >
                ⚙️ Account Settings
              </div>
              <div 
                className={`tab ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                🔐 Security
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'profile' && (
              <>
                {user.googleId && (
                  <div className="google-badge">
                    🔗 Connected with Google Account
                  </div>
                )}

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">First Name</label>
                    <input
                      className="form-input"
                      type="text"
                      value={name.split(' ')[0] || ''}
                      onChange={(e) => setName(e.target.value + ' ' + (name.split(' ')[1] || ''))}
                      placeholder="Enter your first name"
                    />
                    {errors.name && <span className="error-message">⚠️ {errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Last Name</label>
                    <input
                      className="form-input"
                      type="text"
                      value={name.split(' ')[1] || ''}
                      onChange={(e) => setName((name.split(' ')[0] || '') + ' ' + e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Email Address</label>
                    <input
                      className="form-input"
                      type="email"
                      value={user.email || ''}
                      readOnly
                      placeholder="Email address (read-only)"
                    />
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Address</label>
                    <input
                      className="form-input"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your full address"
                    />
                    {errors.address && <span className="error-message">⚠️ {errors.address}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      className="form-input"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="error-message">⚠️ {errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Account Type</label>
                    <input
                      className="form-input"
                      type="text"
                      value={user.userType || ''}
                      readOnly
                      placeholder="User role (read-only)"
                    />
                  </div>
                </div>
              </>
            )}

            {activeTab === 'account' && (
              <div className="account-info">
                <h3 style={{ margin: '0 0 1.5rem 0', color: isDarkMode ? '#f9fafb' : '#1f2937' }}>Account Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <div className="info-icon">📅</div>
                    <div className="info-content">
                      <h4>Member Since</h4>
                      <p>{formatDate(user.joinDate)}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">🕒</div>
                    <div className="info-content">
                      <h4>Last Login</h4>
                      <p>{formatDate(user.lastLogin)}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">👤</div>
                    <div className="info-content">
                      <h4>Account Type</h4>
                      <p>{user.userType}</p>
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="info-icon">🔑</div>
                    <div className="info-content">
                      <h4>Login Method</h4>
                      <p>{user.googleId ? 'Google OAuth' : 'Email & Password'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <>
                {!user.googleId && (
                  <div className="form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">Change Password</label>
                      <input
                        className="form-input"
                        type="password"
                        value={password}
                        onClick={() => setIsEditingPassword(true)}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Click to change password"
                      />
                      {errors.password && <span className="error-message">⚠️ {errors.password}</span>}
                    </div>
                  </div>
                )}
                
                <div style={{ background: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : '#fef2f2', border: `1px solid ${isDarkMode ? 'rgba(239, 68, 68, 0.2)' : '#fecaca'}`, borderRadius: '1rem', padding: '1.5rem', marginTop: '2rem' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    ⚠️ Danger Zone
                  </h4>
                  <p style={{ margin: '0 0 1rem 0', color: isDarkMode ? '#fca5a5' : '#991b1b' }}>
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => setIsDeleteModalOpen(true)}
                    style={{ width: 'auto', flex: 'none' }}
                  >
                    🗑️ Delete Account
                  </button>
                </div>
              </>
            )}

            {activeTab !== 'security' && (
              <div className="button-group">
                <button 
                  className="btn btn-primary" 
                  onClick={handleSaveChanges}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      💾 Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <div className={`modal-overlay ${isUpdateModalOpen ? 'show' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-icon success">✅</div>
            <h3 className="modal-title">Profile Updated Successfully!</h3>
          </div>
          <div className="modal-body">
            <p>Your profile information has been updated and saved to your account.</p>
          </div>
          <div className="modal-footer">
            <button className="btn-modal btn-confirm" onClick={() => setIsUpdateModalOpen(false)}>
              Perfect!
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <div className={`modal-overlay ${isDeleteModalOpen ? 'show' : ''}`}>
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-icon danger">⚠️</div>
            <h3 className="modal-title">Delete Account</h3>
          </div>
          <div className="modal-body">
            <p>Are you absolutely sure you want to delete your account?</p>
            <p style={{ fontWeight: '600', color: '#ef4444' }}>
              This action cannot be undone and all your data will be permanently removed.
            </p>
          </div>
          <div className="modal-footer">
            <button className="btn-modal btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </button>
            <button className="btn-modal btn-confirm danger" onClick={() => {
              setIsDeleteModalOpen(false);
              alert('Account deletion initiated - you will be redirected to login');
            }}>
              Delete Forever
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;