import React, { useState, useEffect } from "react";
import { useEmployees } from "../context/EmployeeContext";
import "./EmployeeFormModal.css"; // optional styling

export default function EmployeeFormModal({ initial, onClose }) {
  const { addEmployee, updateEmployee } = useEmployees();

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    dateOfBirth: "",
    address: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  

  // If editing, fill the form with existing values
  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        email: initial.email,
        age: initial.age,
        dateOfBirth: initial.dateOfBirth?.split("T")[0], // yyyy-mm-dd
        address: initial.address,
        photo: null,
      });

      if (initial.photoUrl) {
        setPreview(initial.photoUrl);
      }
    }
  }, [initial]);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Photo Upload
  const handleFile = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setForm({ ...form, photo: file });
  const localUrl = URL.createObjectURL(file); // 🔥 Creates preview link
  setPreview(localUrl);
};


  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("email", form.email);
    fd.append("age", form.age);
    fd.append("dateOfBirth", form.dateOfBirth);
    fd.append("address", form.address);
    if (form.photo) fd.append("photo", form.photo);

    try {
      if (initial) {
        await updateEmployee(initial._id, fd);
      } else {
        await addEmployee(fd);
      }

      onClose();
    } catch (err) {
      alert("Error saving employee");
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{initial ? "Edit Employee" : "Add Employee"}</h2>

        <form onSubmit={handleSubmit}>

          <label>Name</label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
          />

          <label>Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
          />

          <label>Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
          />

          <label>Address</label>
          <textarea
            name="address"
            rows="3"
            value={form.address}
            onChange={handleChange}
          />

          <label>Photo</label>
          <input type="file" accept="image/*" onChange={handleFile} />

          {preview && (
            <img src={preview} className="preview-photo" alt="preview" />
          )}

          <div className="modal-actions">
            <button type="submit" className="save-btn">
              {initial ? "Update" : "Add"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
