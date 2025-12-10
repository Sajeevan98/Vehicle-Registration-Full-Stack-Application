import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import vehicleClient from "../api/ApiClient";
import VehicleForm from "../components/VehicleForm";
import SubTitle from "../components/SubTitle";
import Toast from '../components/Toast';

function EditVehicle() {
    const title = "Update Vehicle Data";

    const { id } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const loadVehicle = async () => {
            try {
                const res = await vehicleClient.get(`/vehicles/${id}`);
                setVehicle(res.data);
            } catch (err) {
                alert("Vehicle not found!");
                // console.error(err);
            }
        };
        loadVehicle();
    }, [id]);

    const handleSubmit = async (updated) => {
        try {
            await vehicleClient.put(`/vehicles/${id}`, updated);
            setToast({ message: "Vehicle Updated successfully.", type: "info" });

            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (err) {
            const msg = err.response?.data?.message || "Failed to update vehicle!";
            setToast({ message: msg, type: "error" });
        }
    };

    return (
        <>
            <SubTitle title={title} />
            <div className="px-4 py-10">
                {vehicle && <VehicleForm initialData={vehicle} onSubmit={handleSubmit} isEdit={true} />}
            </div>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
}

export default EditVehicle;
