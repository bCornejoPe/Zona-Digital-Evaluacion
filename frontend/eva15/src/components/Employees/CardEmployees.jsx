import React from "react";
import Button from "../Button";

const CardEmployee = ({ employee, deleteEmployee, updateEmployee }) => {
  if (!employee) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {employee.name} {employee.lastName}
        </h2>
        <p className="text-gray-600">
          <span className="font-semibold">Birthday:</span>{" "}
          {new Date(employee.birthday).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> {employee.email}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Address:</span> {employee.address}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Password:</span> {employee.password}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Hire Date:</span>{" "}
          {new Date(employee.hireDate).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Telephone:</span> {employee.telephone}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">DUI:</span> {employee.dui}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Verified:</span>{" "}
          {employee.isVerified ? "Yes" : "No"}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">ISSS Number:</span> {employee.issnumber}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">ID:</span> {employee._id}
        </p>

        <Button 
          label={"Eliminar"}
          actionButton={() => deleteEmployee(employee._id)}
          colorClass={"danger"}
        />

        <Button 
          label={"Editar Información"}
          actionButton={() => updateEmployee(employee)}
          colorClass={"warning"}
        />
      </div>
    </div>
  );
};

export default CardEmployee;
