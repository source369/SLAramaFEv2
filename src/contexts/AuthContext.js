import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Seed demo users on first load
  useEffect(() => {
    const seedUsers = [
      { id: 1, name: 'Visiting Monk', email: 'visiting@example.com', password: 'password', role: 'visiting' },
      { id: 2, name: 'Resident Monk', email: 'resident@example.com', password: 'password', role: 'resident' },
      { id: 3, name: 'Chief Monk', email: 'chief@example.com', password: 'password', role: 'chief' },
    ];
    const storedUsers = JSON.parse(localStorage.getItem('users') || 'null');
    if (!storedUsers) {
      localStorage.setItem('users', JSON.stringify(seedUsers));
    }
  }, []);

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Authenticate against the localStorage "users" list
  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          const { password: pw, ...userWithoutPassword } = user;
          setCurrentUser(userWithoutPassword);
          localStorage.setItem('user', JSON.stringify(userWithoutPassword));
          resolve(userWithoutPassword);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  // Submit a visiting monk registration request
  const submitRegistration = (data) => {
    const requests = JSON.parse(localStorage.getItem('registrationRequests') || '[]');
    const newReq = { id: Date.now(), status: 'pending', ...data };
    requests.push(newReq);
    localStorage.setItem('registrationRequests', JSON.stringify(requests));
    return newReq;
  };

  const approveRegistration = (id, approved) => {
    const requests = JSON.parse(localStorage.getItem('registrationRequests') || '[]');
    const reqIndex = requests.findIndex(r => r.id === id);
    if (reqIndex === -1) return;
    const req = requests[reqIndex];
    requests.splice(reqIndex, 1);
    localStorage.setItem('registrationRequests', JSON.stringify(requests));
    if (approved) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        id: Date.now(),
        name: req.name,
        email: req.email,
        password: req.password,
        role: 'visiting',
        passport: req.passport,
        issuingCountry: req.issuingCountry,
      };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  const submitStayRequest = (data) => {
    const requests = JSON.parse(localStorage.getItem('stayRequests') || '[]');
    const newReq = { id: Date.now(), status: 'pending', ...data };
    requests.push(newReq);
    localStorage.setItem('stayRequests', JSON.stringify(requests));
    return newReq;
  };

  const updateStayRequest = (id, status) => {
    const requests = JSON.parse(localStorage.getItem('stayRequests') || '[]');
    const reqIndex = requests.findIndex(r => r.id === id);
    if (reqIndex === -1) return;
    requests[reqIndex].status = status;
    localStorage.setItem('stayRequests', JSON.stringify(requests));
  };

  const getRegistrationRequests = () => {
    return JSON.parse(localStorage.getItem('registrationRequests') || '[]');
  };

  const getStayRequests = () => {
    return JSON.parse(localStorage.getItem('stayRequests') || '[]');
  };

    const value = {
      currentUser,
      login,
      logout,
      submitRegistration,
      approveRegistration,
      submitStayRequest,
      updateStayRequest,
      getRegistrationRequests,
      getStayRequests,
      isResident: currentUser?.role === 'resident',
      isChief: currentUser?.role === 'chief',
      isVisiting: currentUser?.role === 'visiting',
    };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
