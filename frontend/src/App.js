import React, { useState } from "react";
import "./App.css";
import { useEmployees } from "./context/EmployeeContext";
import EmployeeFormModal from "./components/EmployeeFormModal";

function App() {

  
  const { employees, deleteEmployee } = useEmployees();

  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const openModal = () => {
    setEditingEmployee(null);
    setShowModal(true);
  };

  const openEditModal = (emp) => {
    setEditingEmployee(emp);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditingEmployee(null);
    setShowModal(false);
  };

  return (
    <div className="page-wrapper">
      <div className="employee-card">

        <h1 className="page-title">Employee Management</h1>

        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>DOB</th>
              <th>Address</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.age}</td>
                <td>{new Date(emp.dateOfBirth).toDateString()}</td>
                <td>{emp.address}</td>

                <td>
                  {emp.photoUrl ? (
                    <img src={emp.photoUrl} className="employee-photo" />
                  ) : (
                    "No Photo"
                  )}
                </td>

                <td>
                  <button className="edit-btn" onClick={() => openEditModal(emp)}>
                    Edit
                  </button>

                  <button className="delete-btn" onClick={() => deleteEmployee(emp._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="add-btn" onClick={openModal}>
          + Add Employee
        </button>

        {showModal && (
          <EmployeeFormModal
            initial={editingEmployee}
            onClose={closeModal}
          />
        )}

      </div>
    </div>
  );
}

export default App;
