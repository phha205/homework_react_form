import React from "react";
import StudentForm from "./components/StudentForm.jsx";
import StudentTable from "./components/StudentTable.jsx";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <h2>React Form - Validation</h2>
      <StudentForm />
      <StudentTable />
    </div>
  );
}
