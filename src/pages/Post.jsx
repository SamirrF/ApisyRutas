import { useState } from "react";
import axios from "axios";

export default function FormWithResponse() {
  const [form, setForm] = useState({ nombre: "", job: "" });
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        name: form.nombre,
        job: form.job,
      };

      const response = await axios.post("https://reqres.in/api/users", data, {
        headers: {
          "x-api-key": "reqres-free-v1",
        },
      });

      const user = response.data;
      console.log("response", response);
      setResponse(user);
    } catch (error) {
      console.error("Error al enviar:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow"
      >
        <div>
          <label className="block mb-1 text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Job</label>
          <input
            type="text"
            name="job"
            value={form.job}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>

      {response && (
        <div className="mt-6 bg-green-100 p-4 rounded shadow">
          <p>
            <strong>ID:</strong> {response.id}
          </p>
          <p>
            <strong>Nombre:</strong> {response.name}
          </p>
          <p>
            <strong>Job:</strong> {response.job}
          </p>
          <p>
            <strong>Creado en:</strong> {response.createdAt}
          </p>
        </div>
      )}
    </div>
  );
}
