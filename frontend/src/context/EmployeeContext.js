import React, { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/api';

const EmployeeContext = createContext();

export const useEmployees = () => useContext(EmployeeContext);

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await API.get('/employees');
      setEmployees(res.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const addEmployee = async (formData) => {
    // formData: FormData instance (with file)
    const res = await API.post('/employees', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setEmployees(prev => [res.data, ...prev]);
    return res.data;
  };

  const updateEmployee = async (id, formData) => {
    const res = await API.put(`/employees/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setEmployees(prev => prev.map(e => e._id === id ? res.data : e));
    return res.data;
  };

  const deleteEmployee = async (id) => {
    await API.delete(`/employees/${id}`);
    setEmployees(prev => prev.filter(e => e._id !== id));
  };

  useEffect(() => { fetchEmployees(); }, []);

  return (
    <EmployeeContext.Provider value={{
      employees, loading, fetchEmployees,
      addEmployee, updateEmployee, deleteEmployee
    }}>
      {children}
    </EmployeeContext.Provider>
  );
}