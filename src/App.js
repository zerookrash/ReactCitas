import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Componentes
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {


  // Citas en LocalStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {
    citasIniciales = [];
  }

  // Arreglo de citas
  const [citas, guardarCitas] = useState([]);

  // UseEffect para realizar ciertas operaciones cuando el state cambia
  useEffect( () => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    
    if(citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  // Función que tome las citas actuales y agregue la nueva
  function crearCita(cita) {
    guardarCitas([
      ...citas,
      cita
    ]);
  }

  // Funcion que elimina una cita por id
  const eliminarCita = id => {
    const nevasCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nevasCitas);
  };

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de Pacientes </h1>
  
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario 
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
              <Cita 
                key={citas.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>

      </div>
    </Fragment>
  );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}

export default App;
