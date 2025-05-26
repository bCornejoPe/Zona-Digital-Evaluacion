import React from "react";
import Button from "../Button";

const CardClient = ({ client, deleteClient, updateClient }) => {
  if (!client) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {client.name} {client.lastName}
        </h2>
        <p className="text-gray-600">
          <span className="font-semibold">Birthday:</span>{" "}
          {new Date(client.birthday).toLocaleDateString()}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Email:</span> {client.email}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Password:</span> {client.password}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Telephone:</span> {client.telephone}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">DUI:</span> {client.dui}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Verified:</span>{" "}
          {client.isVerified ? "Yes" : "No"}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">ID:</span> {client._id}
        </p>

        <Button
          label={"Eliminar"}
          actionButton={() => deleteClient(client._id)}
          colorClass={"danger"}
        />

        <Button
          label={"Editar Información"}
          actionButton={() => updateClient(client)}
          colorClass={"warning"}
        />
      </div>
    </div>
  );
};

export default CardClient;
