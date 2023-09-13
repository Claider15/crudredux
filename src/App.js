import Header from "./components/header";
import Productos from "./components/Productos";
import NuevoProducto from "./components/NuevoProducto";
import EditarProducto from "./components/EditarProducto";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
  <Router> {/* Los datos van a fuir desde el provider,utilizando el store. EL store es el que va a tener todo el state y solamente hay un store por aplicación */}
    <Provider store={store}> {/* Todos los datos, todo lo que registremos en nuestros reducers y vayamos a agregar van a estar disponibes en el proyecto */}
      <Header />

      <div className="container mt-5">
        <Routes>
          <Route exact path="/" element={<Productos />} /> {/* Cuando el usuario visita la sig. ruta, quiero que cargue el sig. componente */}
          <Route exact path="/productos/nuevo" element={<NuevoProducto />} />
          <Route exact path="/productos/editar/:id" element={<EditarProducto />} />
        </Routes>
      </div>
    </Provider>
  </Router>
  )
}

export default App;
