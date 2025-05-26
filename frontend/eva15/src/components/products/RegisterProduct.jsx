import React from 'react';
import Button from "../Button";

const RegisterProduct = ({
  name, setName,
  description, setDescription,
  price, setPrice,
  stock, setStock,
  saveProduct,
  handleEdit,
    handleUpdate,
  id
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    id ? handleEdit() : saveProduct();
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Descripción</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Precio</label>
            <input
              type="number"
              value={price}
              min={0}
              onChange={e => setPrice(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Stock</label>
            <input
              type="number"
              value={stock}
              min={0}
              onChange={e => setStock(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
        </div>

        {/* Botón */}
        {id ? (
          <Button
            type="submit"
            label={"Editar Información"}
            actionButton={(e) => {
              handleUpdate(e);
            }}
            colorClass={"warning"}
          />
        ) : (
          <Button
            type="submit"
            label={"Registrar"}
            actionButton={(e) => {
              handleSubmit(e);
            }}
            colorClass={"primary"}
          />
        )}
      </form>
    </div>
  );
};

export default RegisterProduct;
