import React, { useState, useEffect } from "react";
import ListProducts from "../../components/products/ListProducts";
import RegisterProduct from "../../components/products/RegisterProduct";
import toast, { Toaster } from "react-hot-toast";

const Products = () => {
  const [activeTab, setActiveTab] = useState("list");
  const API = "http://localhost:4000/api/products";
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API);
      if (!response.ok) {
        throw new Error("Hubo un error al obtener los productos");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setId("");
    setName("");
    setDescription("");
    setPrice("");
    setStock("");
  };

  const saveProduct = async () => {
    try {
      const newProduct = { name, description, price, stock };

      const response = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error("Hubo un error al registrar el producto");
      }

      toast.success("Producto registrado");
      resetForm();
      fetchProducts();
      setActiveTab("list");
    } catch (error) {
      console.error(error.message);
      toast.error("Error al registrar el producto");
    }
  };

  const handleEdit = async () => {
    try {
      const editedProduct = { name, description, price, stock };

      const response = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProduct),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el producto");
      }

      toast.success("Producto actualizado");
      resetForm();
      fetchProducts();
      setActiveTab("list");
    } catch (error) {
      console.error("Error al editar el producto:", error);
      toast.error("Error al editar el producto");
    }
  };

  const updateProduct = (product) => {
    setId(product._id);
    setName(product.name);
    setDescription(product.description);
    setPrice(product.price);
    setStock(product.stock);
    setActiveTab("form");
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Hubo un error al eliminar el producto");
      }

      toast.success("Producto eliminado");
      fetchProducts();
    } catch (error) {
      console.error(error.message);
      toast.error("Error al eliminar el producto");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Toaster />
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Productos</h1>
        <div>
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`px-4 py-2 ${
                activeTab === "list" ? "text-blue-600 border-b-2 border-blue-500" : "text-gray-600"
              } hover:text-gray-800 focus:outline-none`}
              onClick={() => setActiveTab("list")}
            >
              Lista de productos
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
              Gestionar productos
            </button>
          </div>

          <div>
            {activeTab === "list" && (
              <ListProducts
                products={products}
                loading={loading}
                deleteProduct={deleteProduct}
                updateProduct={updateProduct}
              />
            )}

            {activeTab === "form" && (
              <RegisterProduct
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
                price={price}
                setPrice={setPrice}
                stock={stock}
                setStock={setStock}
                saveProduct={saveProduct}
                handleEdit={handleEdit}
                id={id}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
