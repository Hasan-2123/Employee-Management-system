import React from "react";
import { useEmployees } from "../context/EmployeeContext";

export default function EmployeeList({ onEdit }) {
  const { employees, deleteEmployee } = useEmployees();

  return (
    <div className="table-container">
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
              <td>{emp.age || "-"}</td>
              <td>{emp.dateOfBirth ? new Date(emp.dateOfBirth).toDateString() : "-"}</td>
              <td>{emp.address}</td>
              <td>
                {emp.photoUrl ? (
                  <img
                    src={`http://localhost:5000${emp.photoUrl}`}
                    alt="profile"
                    width="50"
                    height="50"
                    style={{ borderRadius: "5px" }}
                  />
                ) : (
                  "No Photo"
                )}
              </td>
              <td>
                <button className="action-btn edit-btn" onClick={() => onEdit(emp)}>
                  Edit
                </button>

                <button
                  className="action-btn delete-btn"
                  onClick={() => deleteEmployee(emp._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
