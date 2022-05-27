// Importar componentes de react, GaleriaEspacios y FormattedMessage
import React from 'react';
import Espacios from './components/espacios';

// Funcion App
function App() {
  return (
    <div className="container mt-4">
      <Espacios />
    </div>
  );
}

// Exportar App para ser utilizado en archivos externos
export default App;
