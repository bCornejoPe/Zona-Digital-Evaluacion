import React from "react";
import ProductCard from "./ProductCard";

const ListProduct = ({ products, deleteProduct, updateProduct }) => {
  return (
    <div>
      <h1 className="text-2xl font-bold underline text-center">
        Listado de Productos
      </h1>
      <div className="flex flex-wrap gap-4 justify-center mt-5">
        {products?.length === 0 ? (
          <div className="text-center text-gray-500">No hay productos registrados...</div>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              deleteProduct={deleteProduct}
              updateProduct={updateProduct}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ListProduct;
