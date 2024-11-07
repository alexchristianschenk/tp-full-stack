import React, { useState } from 'react';
import './Formulario.css'; 
import { Link } from 'react-router-dom';

function Formulario() {
  const [turnos, setTurnos] = useState([]);

  useEffect(() => {
    const fetchTurnos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/turnos');
        setTurnos(response.data);
      } catch (error) {
        console.error('Error al obtener los hechizos:', error);
      }
    };

    fetchTurnos();
  }, []);
  
  // const [nombre, setNombre] = useState('');
  // const [descripcion, setDescripcion] = useState('');
  // const [nivel, setNivel] = useState('');
  // const navigate = useNavigate();

  // const handleSubmite = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const nuevoHechizo = { nombre, descripcion, nivel };
  //     await axios.post('http://localhost:5000/api/turnos', nuevoHechizo);
  //     navigate('/hechizos');
  //   } catch (error) {
  //     console.error('Error al crear el hechizo:', error);
  //   }
  // };
  

  const [formData, setFormData] = useState({
    nombre: '',
    dia: '',
    horario: '',
  });

  const [submittedData, setSubmittedData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación campos completos
    if (!formData.nombre || !formData.dia || !formData.horario) {
      alert('Por favor, complete todos los campos antes de enviar.');
      return;
    }
    
    setSubmittedData([...submittedData, formData]);
    setFormData({ nombre: '', dia: '', horario: '' });
  };

  // Función para eliminar registro
  const handleDelete = (index) => {
    setSubmittedData(submittedData.filter((_, i) => i !== index));
  };

  return (
    <div className="container">
      {<Link to="/reservas" /> }
      <form onSubmit={handleSubmit} className="form">
        <div className="inputGroup">
          <label className="label">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label className="label">Día:</label>
          <input
            type="date"
            name="dia"
            value={formData.dia}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="inputGroup">
          <label className="label">Horario:</label>
          <input
            type="time"
            name="horario"
            value={formData.horario}
            onChange={handleChange}
            className="input"
          />
        </div>
        <button type="submit" className="button">Reservar</button>
      </form>

      <div className="dataContainer">
        <h3 className="heading">Datos Ingresados</h3>
        {submittedData.map((data, index) => (
          <div key={index} className="dataItem">
            <p className="dataText">Nombre: {data.nombre}</p>
            <p className="dataText">Día: {data.dia}</p>
            <p className="dataText">Horario: {data.horario}</p>
            <button 
              className="deleteButton" 
              onClick={() => handleDelete(index)}>
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Formulario;

