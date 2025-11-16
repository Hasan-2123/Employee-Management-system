import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />
        

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
