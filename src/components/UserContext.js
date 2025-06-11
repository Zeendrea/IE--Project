import React, { createContext, useState, useEffect } from 'react';

// Initial user state
const initialUserState = {
  userId: null,
  name: '',
  email: '',
  address: '',
  phone: '',
  userType: '',
  profileImage: 'http://localhost:8080/uploads/default-profile.jpg', // Default avatar
};

export const UserContext = createContext(initialUserState);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : initialUserState;
  });

  const updatedUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  return (
    <UserContext.Provider value={{ user, updatedUser }}>
      {children}
    </UserContext.Provider>
  );
};
