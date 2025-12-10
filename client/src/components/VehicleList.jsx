import { useEffect, useState } from "react";
import vehicleClient from "../api/ApiClient";
import { Link } from "react-router-dom";
import Toast from '../components/Toast';

function VehicleList() {
    const [vehicles, setVehicles] = useState([]);
    const [toast, setToast] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadVehicles = async () => {
            try {
                const res = await vehicleClient.get("/vehicles");
                setVehicles(res.data);
                setError("");

            } catch (err) {
                const msg = err.response?.data?.message || "Error loading vehicles...";
                setError(msg);
            } finally {
                setIsLoading(false);
            }
        };
        loadVehicles();
    }, []);

    const deleteVehicle = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete)
            return; // if click cancel

        try {
            await vehicleClient.delete(`/vehicles/${id}`);
            setToast({ message: "Vehicle Deleted successfully.", type: "success" });
            setVehicles(prev => prev.filter(v => v.id !== id));

        } catch (err) {
            const msg = err.response?.data?.message || "Failed to delete vehicle!";
            setToast({ message: msg, type: "error" });
        }
    };

    return (
        <div>
            <h2 className="text-blue-500 text-lg font-bold">All Vehicles</h2>
            {isLoading
                ? <h1 className="my-5 text-sm text-gray-500 font-medium italic animate-pulse">Loading data...</h1>
                : <>
                    {error === ""
                        ? <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                            {vehicles.map(veh => (
                                <div key={veh.id} className="border-4 border-solid border-blue-100 m-0.5 p-2 text-sm leading-8">
                                    <p><strong>Vehicle Number:</strong> {veh.licensePlate}</p>
                                    <p><strong>Type:</strong> {veh.plateType}</p>
                                    <p><strong>Vehicle Model:</strong> {veh.vehicleType}</p>
                                    <p><strong>Color:</strong> {veh.vehicleColor}</p>
                                    <p><strong>Owner:</strong> {veh.ownerNic}</p>
                                    <div className="flex justify-around items-center my-2">
                                        <Link to={`/edit-vehicle/${veh.id}`} className="cursor-pointer text-blue-400 font-bold transition-all duration-200 hover:scale-105 hover:text-blue-500">Edit</Link>
                                        <button onClick={() => deleteVehicle(veh.id)} className="cursor-pointer text-red-400 font-bold transition-all duration-200 hover:scale-105 hover:text-red-500">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        : <p className="text-red-500 text-sm font-normal italic">{error}</p>
                    }
                </>
            }
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
}

export default VehicleList;