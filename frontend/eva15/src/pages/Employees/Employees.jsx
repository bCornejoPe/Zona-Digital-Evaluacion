import React, { useState, useEffect } from "react";
import ListEmployees from "../../components/Employees/ListEmployees";
import RegisterEmployee from "../../components/Employees/RegisterEmployees";
import toast, { Toaster } from "react-hot-toast";

const Employees = () => {
  const [activeTab, setActiveTab] = useState("list");
  const API = "http://localhost:4000/api/employees";
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dui, setDui] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [issnumber, setIssnumber] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error("Hubo un error al obtener los empleados");
      }
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const resetForm = () => {
    setId("");
    setName("");
    setLastName("");
    setBirthday("");
    setEmail("");
    setAddress("");
    setPassword("");
    setHireDate("");
    setTelephone("");
    setDui("");
    setIsVerified(false);
    setIssnumber("");
  };

  const saveEmployee = async () => {
    try {
      const newEmployee = {
        name,
        lastName,
        birthday,
        email,
        address,
        password,
        hireDate,
        telephone,
        dui,
        isVerified,
        issnumber
      };

      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        throw new Error("Hubo un error al registrar el empleado");
      }

      toast.success("Empleado registrado");
      resetForm();
      fetchEmployees();
      setActiveTab("list");
    } catch (error) {
      console.error(error.message);
      toast.error("Error al registrar el empleado");
    }
  };

  const handleEdit = async () => {
    try {
      const editedEmployee = {
        name,
        lastName,
        birthday,
        email,
        address,
        password,
        hireDate,
        telephone,
        dui,
        isVerified,
        issnumber
      };

      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedEmployee),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el empleado");
      }

      toast.success("Empleado actualizado");
      resetForm();
      fetchEmployees();
      setActiveTab("list");
    } catch (error) {
      console.error("Error al editar el empleado:", error);
      toast.error("Error al editar el empleado");
    }
  };

  const updateEmployee = (employee) => {
    setId(employee._id);
    setName(employee.name);
    setLastName(employee.lastName);
    setBirthday(employee.birthday);
    setEmail(employee.email);
    setAddress(employee.address);
    setPassword(employee.password);
    setHireDate(employee.hireDate);
    setTelephone(employee.telephone);
    setDui(employee.dui);
    setIsVerified(employee.isVerified);
    setIssnumber(employee.issnumber);
    setActiveTab("form");
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Hubo un error al eliminar el empleado");
      }

      toast.success("Empleado eliminado");
      fetchEmployees();
    } catch (error) {
      console.error(error.message);
      toast.error("Error al eliminar el empleado");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Empleados</h1>
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`px-4 py-2 ${
                activeTab === "list" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-600"
              } hover:text-gray-800 focus:outline-none`}
              onClick={() => setActiveTab("list")}
            >
              Lista de empleados
            </button>
            <button
              className={`px-4 py-2 ${
                activeTab === "form" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-600"
              } hover:text-gray-800 focus:outline-none`}
              onClick={() => {
                resetForm();
                setActiveTab("form");
              }}
            >
              Gestionar empleados
            </button>
          </div>

          <div>
            {activeTab === "list" && (
              <ListEmployees
                employees={employees}
                loading={loading}
                deleteEmployee={deleteEmployee}
                updateEmployee={updateEmployee}
              />
            )}

            {activeTab === "form" && (
              <RegisterEmployee
                id={id}
                name={name}
                setName={setName}
                lastName={lastName}
                setLastName={setLastName}
                birthday={birthday}
                setBirthday={setBirthday}
                email={email}
                setEmail={setEmail}
                address={address}
                setAddress={setAddress}
                password={password}
                setPassword={setPassword}
                hireDate={hireDate}
                setHireDate={setHireDate}
                telephone={telephone}
                setTelephone={setTelephone}
                dui={dui}
                setDui={setDui}
                isVerified={isVerified}
                setIsVerified={setIsVerified}
                issnumber={issnumber}
                setIssnumber={setIssnumber}
                saveEmployee={saveEmployee}
                handleEdit={handleEdit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;
