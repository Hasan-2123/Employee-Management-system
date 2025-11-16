import React from "react";
import { useEmployees } from "../context/EmployeeContext";

export default function EmployeeCard({ emp, onEdit }) {
  const { deleteEmployee } = useEmployees();

  return (
    <div className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition duration-300">
      <img
        src={
          emp.photoUrl
            ? `http://localhost:5000${emp.photoUrl}`
            : "/placeholder.png"
        }
        alt={emp.name}
        className="h-32 w-32 rounded-full mx-auto object-cover"
      />

      <h3 className="text-xl font-semibold text-center mt-3">{emp.name}</h3>
      <p className="text-gray-500 text-center">{emp.email}</p>

      <div className="mt-3 space-y-1 text-sm text-gray-700">
        <p><b>Age:</b> {emp.age || "-"}</p>
        <p><b>DOB:</b> {emp.dateOfBirth ? new Date(emp.dateOfBirth).toDateString() : "-"}</p>
        <p><b>Address:</b> {emp.address}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onEdit(emp)}
          className="px-3 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={() => {
            if (window.confirm("Delete this employee?")) deleteEmployee(emp._id);
          }}
          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
