import React from 'react';
import Button from "../Button";

const RegisterEmployee = ({
  name, setName,
  lastName, setLastName,
  birthday, setBirthday,
  email, setEmail,
  address, setAddress,
  password, setPassword,
  hireDate, setHireDate,
  telephone, setTelephone,
  dui, setDui,
  isVerified, setIsVerified,
  issnumber, setIssnumber,
  saveEmployee,
  handleEdit,
  handleUpdate,
  id
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    id ? handleEdit() : saveEmployee();
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

          {/* Apellido */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Apellido</label>
            <input
              type="text"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Fecha de nacimiento</label>
            <input
              type="date"
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Dirección */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Dirección</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Fecha de contratación */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Fecha de contratación</label>
            <input
              type="date"
              value={hireDate}
              onChange={e => setHireDate(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Teléfono</label>
            <input
              type="text"
              value={telephone}
              onChange={e => setTelephone(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* DUI */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">DUI</label>
            <input
              type="text"
              value={dui}
              onChange={e => setDui(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>

          {/* Verificado */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">¿Verificado?</label>
            <select
              value={isVerified}
              onChange={e => setIsVerified(e.target.value === 'true')}
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="true">Sí</option>
              <option value="false">No</option>
            </select>
          </div>

          {/* Número ISSS */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">Número ISSS</label>
            <input
              type="text"
              value={issnumber}
              onChange={e => setIssnumber(e.target.value)}
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

export default RegisterEmployee;
