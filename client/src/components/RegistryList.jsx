import { useEffect, useState } from "react";
import registryClient from "../api/ApiClient";
import vehicleClient from "../api/ApiClient";
import { Link } from "react-router-dom";
import Toast from '../components/Toast';

function RegistryList() {
    const [registry, setRegistry] = useState([]);
    const [toast, setToast] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const loadRegistryData = async () => {
            try {
                const res = await registryClient.get("/registry");
                setRegistry(res.data);
                setError("");

            } catch (err) {
                const msg = err.response?.data?.message || "Error loading registry...";
                setError(msg);
            } finally {
                setIsLoading(false);
            }
        };
        loadRegistryData();
    }, []);

    const VerifyExists = async (deleteRequestRegistryNic) => {
        try {
            const res = await vehicleClient.get("/vehicles");
            const vehicleList = res.data;

            setVehicles(vehicleList);
            setError("");

            const exists = vehicleList.some(
                veh => veh.ownerNic === deleteRequestRegistryNic
            );

            if (exists) {
                alert("This record is associated with a Vehicle Record! Can not delete.");
                return false;
            }
            return true;

        } catch (err) {
            const msg = err.response?.data?.message || "Error loading vehicles...";
            setError(msg);
            return false;
        }
    };


    const deleteRegistry = async (id, nic) => {
        const confirmDelete = window.confirm("Are you sure you want to delete?");
        if (!confirmDelete) return;

        // Verify, if this Owner(via NIC) is linked to a Vehicle record. 
        // Delete the Owner, if no such record exists.
        const status = await VerifyExists(nic);

        if (!status)
            return;

        try {
            await registryClient.delete(`/registry/${id}`);
            setToast({ message: "Registry Deleted successfully.", type: "success" });
            setRegistry(prev => prev.filter(reg => reg.id !== id));
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to delete Registry!";
            setToast({ message: msg, type: "error" });
        }
    };

    return (
        <div>
            <h2 className="text-blue-500 text-lg font-bold mb-2">All Registered Owners</h2>
            {isLoading
                ? <h1 className="my-5 text-sm text-gray-500 font-medium italic animate-pulse">Loading data...</h1>
                : <>
                    {error === ""
                        ? <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                            {registry.map(reg => (
                                <div key={reg.id} className="border-4 border-solid border-blue-100 m-0.5 p-2 text-sm leading-8">
                                    <p><strong>Name: </strong> {reg.firstName} {reg.middleName} {reg.lastName}</p>
                                    <p><strong>NIC: </strong> {reg.ownerNic}</p>
                                    <p><strong>Address: </strong> {reg.address}</p>
                                    <p><strong>Mobile: </strong> {reg.phone}</p>
                                    <div className="flex justify-around items-center my-2">
                                        <Link to={`/edit-owner/${reg.id}`} className="cursor-pointer text-blue-400 font-bold transition-all duration-200 hover:scale-105 hover:text-blue-500">Edit</Link>
                                        <button onClick={() => deleteRegistry(reg.id, reg.ownerNic)} className="cursor-pointer text-red-400 font-bold transition-all duration-200 hover:scale-105 hover:text-red-500">Delete</button>
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

export default RegistryList;