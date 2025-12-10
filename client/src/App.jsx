import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateVehicle from "./pages/CreateVehicle";
import CreateRegistry from "./pages/CreateRegistry"
import EditVehicle from "./pages/EditVehicle";
import NotFound from "./pages/NotFound";
import Registries from "./pages/Registries";
import EditRegistry from "./pages/EditRegistry";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/registries" element={<Registries />} />
                <Route path="/register-vehicle" element={<CreateVehicle />} />
                <Route path="/edit-vehicle/:id" element={<EditVehicle />} />
                <Route path="/register-owner" element={<CreateRegistry />} />
                <Route path="/edit-owner/:id" element={<EditRegistry />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
