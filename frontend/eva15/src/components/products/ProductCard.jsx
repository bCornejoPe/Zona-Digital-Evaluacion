import React from "react";
import Button from "../Button";

const ProductCard = ({ product, deleteProduct, updateProduct }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover mb-4 rounded"
          />
        )}
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {product.name}
        </h2>
        <p className="text-gray-500 mb-2">{product.description}</p>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Precio: </span>
          <span>${product.price}</span>
        </div>
        <div className="mb-2">
          <span className="font-semibold text-gray-700">Stock: </span>
          <span>{product.stock}</span>
        </div>
        {product.discount > 0 && (
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Descuento: </span>
            <span>{product.discount}%</span>
          </div>
        )}
        {product.brand && (
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Marca: </span>
            <span>{product.brand.name}</span>
          </div>
        )}
        {product.model && (
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Modelo: </span>
            <span>{product.model.name}</span>
          </div>
        )}
        {product.category && (
          <div className="mb-2">
            <span className="font-semibold text-gray-700">Categoría: </span>
            <span>{product.category.name}</span>
          </div>
        )}
        <div className="flex gap-2 mt-4">
          <Button
            label={"Eliminar"}
            actionButton={() => deleteProduct(product._id)}
            colorClass={"danger"}
          />
          <Button
            label={"Editar Información"}
            actionButton={() => updateProduct(product)}
            colorClass={"warning"}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
