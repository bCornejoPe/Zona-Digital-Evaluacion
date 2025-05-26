import React from "react";
import CardClient from "../Clientes/CardClients"; 

const ListClients = ({ clients, deleteClient, updateClient }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold underline text-center">
        Listado de Clientes
      </h1>
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        {clients?.length === 0 ? (
          <div className="text-center text-gray-500">
            No hay clientes registrados...
          </div>
        ) : (
          clients.map((client) => (
            <CardClient
              key={client._id}
              client={client}
              deleteClient={deleteClient}
              updateClient={updateClient}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ListClients;
