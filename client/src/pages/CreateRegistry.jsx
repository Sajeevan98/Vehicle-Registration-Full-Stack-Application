import registryClient from "../api/ApiClient";
import { useNavigate } from "react-router-dom";
import SubTitle from '../components/SubTitle';
import RegistryForm from "../components/RegistryForm";
import Toast from '../components/Toast';
import { useState } from "react";

function CreateRegistry() {

    const title = "Vehicle Owner Registration";
    const navigate = useNavigate();

    const [toast, setToast] = useState(null);

    const handleSubmit = async (reg) => {
        // console.log(reg);
        try {
            await registryClient.post("/registry", reg);
            setToast({ message: "Vehicle created successfully!", type: "success" });
            setTimeout(() => {
                navigate("/registries");
            }, 1000);

        } catch (err) {
            const msg = err.response?.data?.message || "Failed to save Registry!";
            setToast({ message: msg, type: "error" });
        }
    };

    return (
        <>
            <SubTitle title={title} />
            <div className="md:px-16 px-4 py-8">
                <RegistryForm onSubmit={handleSubmit} isEdit={false} />
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

export default CreateRegistry;
