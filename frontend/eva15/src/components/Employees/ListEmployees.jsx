import React from "react";
import CardEmployee from "../Employees/CardEmployees"; 

const ListEmployees = ({ employees, deleteEmployee, updateEmployee }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold underline text-center">
        Listado de Empleados
      </h1>
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        {employees?.length === 0 ? (
          <div className="text-center text-gray-500">
            No hay empleados registrados...
          </div>
        ) : (
          employees.map((employee) => (
            <CardEmployee
              key={employee._id}
              employee={employee}
              deleteEmployee={deleteEmployee}
              updateEmployee={updateEmployee}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ListEmployees;
