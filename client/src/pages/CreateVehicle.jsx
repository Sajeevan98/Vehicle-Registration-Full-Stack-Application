import VehicleForm from "../components/VehicleForm";
import vehicleClient from "../api/ApiClient";
import { useNavigate } from "react-router-dom";
import SubTitle from '../components/SubTitle';
import Toast from '../components/Toast';
import { useState } from "react";

function CreateVehicle() {

    const title = "Create Vehicle";
    const navigate = useNavigate();

    const [toast, setToast] = useState(null);

    const handleSubmit = async (veh) => {
        // console.log(veh);
        try {
            await vehicleClient.post("/vehicles", veh);
            setToast({ message: "Vehicle created successfully!", type: "success" });

            setTimeout(() => {
                navigate("/");
            }, 2000);

        } catch (err) {
            const msg = err.response?.data?.message || "Failed to save vehicle!";
            setToast({ message: msg, type: "error" });
        }
    };

    return (
        <>
            <SubTitle title={title} />
            <div className="px-4 py-10">
                <VehicleForm onSubmit={handleSubmit} isEdit={false} />
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

export default CreateVehicle;
