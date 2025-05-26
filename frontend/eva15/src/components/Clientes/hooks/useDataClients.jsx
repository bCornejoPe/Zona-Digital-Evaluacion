import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useDataClients = () => {
  const ApiRegister = "http://localhost:4000/api/registerClients";
  const ApiClients = "http://localhost:4000/api/clients";

  const [activeTab, setActiveTab] = useState("list");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dui, setDui] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const [errorClient, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);

  const cleanData = () => {
    setId("");
    setName("");
    setLastName("");
    setBirthday("");
    setEmail("");
    setPassword("");
    setTelephone("");
    setDui("");
    setIsVerified(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(ApiClients);
      if (!response.ok) throw new Error("Error al obtener los clientes");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error("Error al obtener datos:", error);
      toast.error("No se pudo cargar la lista de clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const saveClient = async () => {
    if (
      !name || !lastName || !birthday || !email || !password ||
      !telephone || !dui
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const newClient = {
        name,
        lastName,
        birthday,
        email,
        password,
        telephone,
        dui,
        isVerified,
      };

      const response = await fetch(ApiRegister, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) throw new Error("Error al registrar el cliente");

      toast.success("Cliente registrado");
      setSuccess("Cliente registrado correctamente");
      cleanData();
      fetchData();
    } catch (error) {
      setError(error.message);
      toast.error("Ocurrió un error al registrar el cliente");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (
      !name || !lastName || !birthday || !email ||
      !telephone || !dui
    ) {
      toast.error("Todos los campos son obligatorios");
      return;
    }

    try {
      const updatedClient = {
        name,
        lastName,
        birthday,
        email,
        password,
        telephone,
        dui,
        isVerified,
      };

      const response = await fetch(`${ApiClients}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedClient),
      });

      if (!response.ok) throw new Error("Error al actualizar el cliente");

      toast.success("Cliente actualizado correctamente");
      setSuccess("Cliente actualizado correctamente");
      cleanData();
      setActiveTab("list");
      fetchData();
    } catch (error) {
      setError(error.message);
      toast.error("Error al actualizar el cliente");
    } finally {
      setLoading(false);
    }
  };

  const deleteClient = async (id) => {
    try {
      const response = await fetch(`${ApiClients}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Error al eliminar el cliente");

      toast.success("Cliente eliminado correctamente");
      fetchData();
    } catch (error) {
      console.error("Error al eliminar:", error);
      toast.error("No se pudo eliminar el cliente");
    }
  };

  const updateClient = (client) => {
    setId(client._id);
    setName(client.name);
    setLastName(client.lastName);
    setBirthday(client.birthday);
    setEmail(client.email);
    setPassword(client.password || "");
    setTelephone(client.telephone);
    setDui(client.dui);
    setIsVerified(client.isVerified || false);
    setActiveTab("form");
    setError(null);
    setSuccess(null);
  };

  return {
    id, setId,
    name, setName,
    lastName, setLastName,
    birthday, setBirthday,
    email, setEmail,
    password, setPassword,
    telephone, setTelephone,
    dui, setDui,
    isVerified, setIsVerified,

    activeTab, setActiveTab,
    errorClient: errorClient, setError,
    success, setSuccess,
    loading, setLoading,
    clients, setClients,

    cleanData,
    saveClient,
    handleEdit,
    fetchData,
    deleteClient,
    updateClient,
  };
};

export default useDataClients;
