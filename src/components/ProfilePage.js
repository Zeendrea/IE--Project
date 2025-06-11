import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import HomeNavbar from './HomeNavbar';
import EmployerNav from './EmployerNav';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  IconButton,
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function ProfilePage() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
  const [name, setName] = useState(user.name || '');
  const [address, setAddress] = useState(user.address || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [password, setPassword] = useState(user.password || '');
  const [profileImage, setProfileImage] = useState(user.profileImage || null);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.userId && !user.googleId) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchGoogleUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/user-info', {
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error(`Error fetching Google user info: ${response.status}`);
        }
  
        const googleData = await response.json();
        console.log("Google data received:", googleData);
  
        const updatedGoogleUser = {
          ...user,
          name: googleData.name || user.name,
          email: googleData.email || user.email,
          profileImage: googleData.picture || user.profileImage,
          googleId: googleData.sub || user.googleId,
        };
  
        setUser(updatedGoogleUser);
        setName(updatedGoogleUser.name);
        setProfileImage(updatedGoogleUser.profileImage);
        localStorage.setItem('user', JSON.stringify(updatedGoogleUser));
      } catch (error) {
        console.error('Failed to fetch Google user info', error);
      }
    };
  
    if (user.loginMethod === 'google') {
      fetchGoogleUserInfo();
    }
  }, [user]); // only depend on user
  

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

    const formData = new FormData();
    formData.append('userId', user.userId || '');
    formData.append('googleId', user.googleId || '');
    formData.append('name', name);
    formData.append('address', address);
    formData.append('phone', phone);
    formData.append('email', user.email);
    formData.append('userType', user.userType);
    formData.append('loginMethod', user.loginMethod);

    if (!user.googleId) {
      formData.append('password', isEditingPassword && password.trim() ? password : user.password);
    }

    if (profileImage && typeof profileImage === 'string') {
      formData.append('profileImage', profileImage);
    } else if (profileImage && profileImage instanceof File) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await fetch(`http://localhost:8080/user/update-profile`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedUser = {
          ...user,
          name,
          address,
          phone,
          password: user.googleId ? undefined : (password.trim() ? password : user.password),
          profileImage,
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsUpdateModalOpen(true);
      } else {
        const errorMessage = await response.text();
        alert('Error: ' + errorMessage);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileImage(file);
      const newUser = { ...user, profileImage: URL.createObjectURL(file) };
      localStorage.setItem('user', JSON.stringify(newUser));
    }
  };

  const getProfileImageUrl = () => {
    if (!profileImage) {
      return 'http://localhost:8080/uploads/default-profile.jpg';
    }
    
    if (profileImage instanceof File) {
      return URL.createObjectURL(profileImage);
    }
    
    // Handle Google profile image or image from DB
    if (typeof profileImage === 'string') {
      // If it's a full URL (like Google profile picture), use directly
      if (profileImage.startsWith('http')) {
        return profileImage;
      }
      // Otherwise it's a relative path from our backend
      return `http://localhost:8080/${profileImage}`;
    }
    
    return 'http://localhost:8080/uploads/default-profile.jpg';
  };

  const profileImageUrl = getProfileImageUrl();

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/user/deleteUser/${user.userId || user.googleId}`,
        { method: 'DELETE' }
      );

      if (response.ok) {
        localStorage.removeItem('user');
        return true;
      } else {
        const errorMessage = await response.text();
        alert('Error: ' + errorMessage);
        return false;
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Error deleting account');
      return false;
    }
  };

  return (
    <div className="profile-page">
      {user.userType === 'Employer' ? (
        <EmployerNav />
      ) : (
        <HomeNavbar userAvatar={profileImageUrl} />
      )}

      <div className="profile-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &#8592; Back
      </button>
        <h2 className="profile-title">Profile</h2>
        {user.googleId && (
          <Typography variant="caption" color="primary" style={{ textAlign: 'center', display: 'block', marginBottom: '15px' }}>
            Logged in with Google (ID: {user.googleId})
          </Typography>
        )}
        <form onSubmit={(e) => e.preventDefault()} className="profile-form">
          <div className="profile-image-container">
            <Avatar src={profileImageUrl} alt="Profile" sx={{ width: 100, height: 100, margin: 'auto' }} />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="upload-profile-image"
              type="file"
              onChange={handleProfileImageChange}
            />
            <label htmlFor="upload-profile-image">
              <IconButton component="span">
                <CameraAltIcon />
              </IconButton>
            </label>
          </div>

          <div className="profile-form-group">
            <label className="profile-label">Name</label>
            <input
              className="profile-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="profile-form-group">
            <label className="profile-label">Email</label>
            <input
              className="profile-input"
              type="email"
              value={user.email || ''}
              readOnly
              style={{ backgroundColor: '#f5f5f5' }}
            />
          </div>

          <div className="profile-form-group">
            <label className="profile-label">Address</label>
            <input
              className="profile-input"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {errors.address && <p className="error">{errors.address}</p>}
          </div>

          <div className="profile-form-group">
            <label className="profile-label">Phone</label>
            <input
              className="profile-input"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <p className="error">{errors.phone}</p>}
          </div>

          {!user.googleId && (
            <div className="profile-form-group">
              <label className="profile-label">Password</label>
              <input
                className="profile-input"
                type="password"
                value={password}
                onClick={() => setIsEditingPassword(true)}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
          )}

          <div className="profile-form-group">
            <label className="profile-label">Role (User Type)</label>
            <input className="profile-input" type="text" value={user.userType || ''} readOnly style={{ backgroundColor: '#f5f5f5' }} />
          </div>

          <button className="profile-button" type="button" onClick={handleSaveChanges}>
            Save Changes
          </button>
          <button className="delete-account-button" type="button" onClick={() => setIsDeleteModalOpen(true)}>
            Delete Account
          </button>
        </form>
      </div>

      <Dialog open={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <DialogTitle>Update Successful</DialogTitle>
        <DialogContent>
          <Typography>Your profile has been updated successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsUpdateModalOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete your account? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          <Button
            onClick={async () => {
              setIsDeleteModalOpen(false);
              const response = await handleDeleteAccount();
              if (response) {
                navigate('/login');
              }
            }}
            color="error"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfilePage;