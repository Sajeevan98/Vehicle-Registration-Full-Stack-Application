import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import registryClient from "../api/ApiClient";
import SubTitle from "../components/SubTitle";
import RegistryForm from "../components/RegistryForm";
import Toast from '../components/Toast';

function EditRegistry() {
    const title = "Update Owner Data";

    const { id } = useParams();
    const navigate = useNavigate();
    const [owner, setOwner] = useState(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const loadOwner = async () => {
            try {
                const res = await registryClient.get(`/registry/${id}`);
                setOwner(res.data);
            } catch (err) {
                // console.error(err);
                alert("Owner not found!");
            }
        };

        loadOwner();
    }, [id]);


    const handleSubmit = async (updated) => {
        try {
            await registryClient.put(`/registry/${id}`, updated);

            setToast({ message: "Registry Updated successfully.", type: "info" });

            setTimeout(() => {
                navigate("/registries");
            }, 1500);

        } catch (err) {
            const msg = err.response?.data?.message || "Failed to update Registry!";
            setToast({ message: msg, type: "error" });
        }
    };


    return (
        <>
            <SubTitle title={title} />
            <div className="px-20 py-8">
                {owner && <RegistryForm initialData={owner} onSubmit={handleSubmit} isEdit={true} />}
            </div>
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    )
}

export default EditRegistry;
