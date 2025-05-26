import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataEmployees = () => {
  const ApiRegister = "http://localhost:4000/api/registerEmployees";
  const ApiEmployees = "http://localhost:4000/api/employees";

  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dui, setDui] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [issnumber, setIssnumber] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [errorEmpleado, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);

  const cleanData = () => {
    setId("");
    setName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setTelephone("");
    setDui("");
    setAddress("");
    setBirthday("");
    setHireDate("");
    setIssnumber("");
    setIsVerified(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(ApiEmployees);
      if (!response.ok) throw new Error("Error al obtener los empleados");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
      toast.error("No se pudo cargar la lista de empleados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveEmployee = async () => {
    if (
      !name || !lastName || !email || !password ||
      !telephone || !dui || !address || !birthday ||
      !hireDate || !issnumber
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const newEmployee = {
        name,
        lastName,
        email,
        password,
        telephone,
        dui,
        address,
        birthday,
        hireDate,
        isVerified,
        issnumber,
      };

      const response = await fetch(ApiRegister, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) throw new Error("Error al registrar el empleado");

      toast.success("Empleado registrado");
      setSuccess("Empleado registrado correctamente");
      cleanData();
      fetchData();
    } catch (error) {
      setError(error.message);
      toast.error("Ocurrió un error al registrar el empleado");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (
      !name || !lastName || !email || !telephone || !dui ||
      !address || !birthday || !hireDate || !issnumber
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const updatedEmployee = {
        name,
        lastName,
        email,
        password,
        telephone,
        dui,
        address,
        birthday,
        hireDate,
        isVerified,
        issnumber,
      };

      const response = await fetch(`${ApiEmployees}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedEmployee),
      });

      if (!response.ok) throw new Error("Error al actualizar el empleado");

      toast.success("Empleado actualizado correctamente");
      setSuccess("Empleado actualizado correctamente");
      cleanData();
      setActiveTab("list");
      fetchData();
    } catch (error) {
      setError(error.message);
      toast.error("Error al actualizar el empleado");
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const response = await fetch(`${ApiEmployees}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar el empleado");

      toast.success("Empleado eliminado correctamente");
      fetchData();
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("No se pudo eliminar el empleado");
    }
  };

  const updateEmployee = (employee) => {
    setId(employee._id);
    setName(employee.name);
    setLastName(employee.lastName);
    setEmail(employee.email);
    setPassword(employee.password || ""); // Si no viene, se puede dejar en blanco
    setTelephone(employee.telephone);
    setDui(employee.dui);
    setAddress(employee.address);
    setBirthday(employee.birthday);
    setHireDate(employee.hireDate);
    setIssnumber(employee.issnumber);
    setIsVerified(employee.isVerified || false);
    setActiveTab("form");
    setError(null);
    setSuccess(null);
  };

  return {
    // Estados del formulario
    id, setId,
    name, setName,
    lastName, setLastName,
    email, setEmail,
    password, setPassword,
    telephone, setTelephone,
    dui, setDui,
    address, setAddress,
    birthday, setBirthday,
    hireDate, setHireDate,
    issnumber, setIssnumber,
    isVerified, setIsVerified,

    // Estados generales
    activeTab, setActiveTab,
    errorEmpleado, setError,
    success, setSuccess,
    loading, setLoading,
    employees, setEmployees,

    // Funciones
    cleanData,
    saveEmployee,
    handleEdit,
    fetchData,
    deleteEmployee,
    updateEmployee,
  };
};

export default useDataEmployees;
