import React, { useState, useEffect } from "react";
import ListClients from "../../components/Clientes/ListClients";
import RegisterClient from "../../components/Clientes/RegisterClients";
import toast, { Toaster } from "react-hot-toast";

const Clients = () => {
  const [activeTab, setActiveTab] = useState("list");
  const API = "http://localhost:4000/api/clients";
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dui, setDui] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const response = await fetch(API);
      if (!response.ok) throw new Error("Hubo un error al obtener los clientes");
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const resetForm = () => {
    setId("");
    setName("");
    setLastName("");
    setBirthday("");
    setEmail("");
    setAddress("");
    setPassword("");
    setTelephone("");
    setDui("");
    setIsVerified(false);
  };

  const saveClient = async () => {
    try {
      const newClient = {
        name,
        lastName,
        birthday,
        email,
        address,
        password,
        telephone,
        dui,
        isVerified
      };

      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });

      if (!response.ok) throw new Error("Hubo un error al registrar el cliente");

      toast.success("Cliente registrado");
      resetForm();
      fetchClients();
      setActiveTab("list");
    } catch (error) {
      console.error(error.message);
      toast.error("Error al registrar el cliente");
    }
  };

  const handleEdit = async () => {
    try {
      const editedClient = {
        name,
        lastName,
        birthday,
        email,
        address,
        password,
        telephone,
        dui,
        isVerified
      };

      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedClient),
      });

      if (!response.ok) throw new Error("Error al actualizar el cliente");

      toast.success("Cliente actualizado");
      resetForm();
      fetchClients();
      setActiveTab("list");
    } catch (error) {
      console.error("Error al editar el cliente:", error);
      toast.error("Error al editar el cliente");
    }
  };

  const updateClient = (client) => {
    setId(client._id);
    setName(client.name);
    setLastName(client.lastName);
    setBirthday(client.birthday);
    setEmail(client.email);
    setAddress(client.address);
    setPassword(client.password);
    setTelephone(client.telephone);
    setDui(client.dui);
    setIsVerified(client.isVerified);
    setActiveTab("form");
  };

  const deleteClient = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Hubo un error al eliminar el cliente");

      toast.success("Cliente eliminado");
      fetchClients();
    } catch (error) {
      console.error(error.message);
      toast.error("Error al eliminar el cliente");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Clientes</h1>
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`px-4 py-2 ${activeTab === "list" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-600"} hover:text-gray-800 focus:outline-none`}
              onClick={() => setActiveTab("list")}
            >
              Lista de clientes
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "form" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-600"} hover:text-gray-800 focus:outline-none`}
              onClick={() => {
                resetForm();
                setActiveTab("form");
              }}
            >
              Gestionar clientes
            </button>
          </div>

          <div>
            {activeTab === "list" && (
              <ListClients
                clients={clients}
                loading={loading}
                deleteClient={deleteClient}
                updateClient={updateClient}
              />
            )}

            {activeTab === "form" && (
              <RegisterClient
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
                telephone={telephone}
                setTelephone={setTelephone}
                dui={dui}
                setDui={setDui}
                isVerified={isVerified}
                setIsVerified={setIsVerified}
                saveClient={saveClient}
                handleEdit={handleEdit}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
