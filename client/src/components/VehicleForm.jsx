import { useEffect, useState } from "react";
import vehicleClient from "../api/ApiClient";
import { ImSpinner3 } from "react-icons/im";
import Toast from '../components/Toast';
import { usePlateFormatter } from '../utils/usePlateFormatter';
import { SiVerizon } from "react-icons/si";

function VehicleForm({ onSubmit, initialData, isEdit = false }) {
    const [licensePlate, setLicensePlate] = useState(initialData?.licensePlate || "");
    const [plateType, setPlateType] = useState(initialData?.plateType || "");
    const [ownerNic, setOwnerNic] = useState(initialData?.ownerNic || "");
    const [vehicleColor, setVehicleColor] = useState(initialData?.vehicleColor || "");
    const [vehicleType, setVehicleType] = useState(initialData?.vehicleType || "");
    const [owners, setOwners] = useState([]);
    const [error, setError] = useState("");
    const [validating, setValidating] = useState(false);
    const [validPlate, setValidPlate] = useState(false);
    const [toast, setToast] = useState(null);
    const { oldPlate, vintagePlate, modernPlate } = usePlateFormatter();

    // Load the registy(owner) data
    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const res = await vehicleClient.get("/registry");
                setOwners(res.data);
                if (isEdit) {
                    setValidPlate(true);
                }
            } catch (err) {
                console.error("Error loading owners: ", err);
            }
        };
        fetchOwners();
    }, []);


    // Backend validation for Number Plate
    const validatePlate = async () => {
        if (!licensePlate.trim()) {
            setError("Please enter a plate number first!");
            return;
        }

        setValidating(true);
        setError("");

        // set normalized number plate for all types
        let normalized =
            oldPlate(licensePlate) ||
            vintagePlate(licensePlate) ||
            modernPlate(licensePlate);

        if (!normalized) {
            setError("Invalid plate format!");
            setValidPlate(false);
            setPlateType("");
            setValidating(false);
            return;
        }

        // update normalized plate number
        setLicensePlate(normalized);

        try {
            // Validate the plate using backend api
            const validateRes = await vehicleClient.get("/vehicles/validate", {
                params: { plate: licensePlate }
            });

            const isValid = validateRes.data;
            setValidPlate(isValid);

            if (!isValid) {
                setPlateType("");
                setError("See! Is this Your Vehicle Number?");
                return;
            }

            // Classify the plate, If valid Number Plate
            const classifyRes = await vehicleClient.get("/vehicles/classify", {
                params: { plate: licensePlate }
            });

            setPlateType(classifyRes.data.toUpperCase());

        } catch (err) {
            console.error(err);
            setError("Error validating plate!");
        } finally {
            setValidating(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!plateType) {
            setError("Please validate the plate number before saving!");
            return;
        }

        onSubmit({
            licensePlate,
            plateType,
            ownerNic,
            vehicleColor,
            vehicleType
        });
    };

    const textToCopy = "ශ්‍රී";
    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy)
        setToast({ message: `${textToCopy} Letter Copied!`, type: "success" });
    };
    const handleReset = () => {
        setLicensePlate("");
        setPlateType("");
        setOwnerNic("");
        setVehicleColor("");
        setVehicleType("");
        setError("");
        setValidPlate("");
        setValidating("");
    };

    return (
        <>
            <div className="max-w-xl mx-auto py-4 flex justify-between items-center">
                <button onClick={handleCopy} className="px-4 py-1 text-sm border rounded-full cursor-pointer transition duration-200 active:scale-95 hover:bg-gray-200">Copy the Letter: <span className="font-extrabold text-sm ml-1 text-gray-500" >{textToCopy}</span></button>
                <button onClick={handleReset} className="px-4 py-1 text-sm border rounded-full cursor-pointer transition duration-200 active:scale-95 hover:bg-gray-200">Reset Form</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 rounded-xl shadow-lg border border-green-300 bg-white max-w-xl mx-auto">
                <h2 className="text-xl font-semibold text-green-700 mb-6 border-b pb-2">
                    {isEdit ? "Vehicle Update Form" : "Vehicle Registration Form"}
                </h2>

                {/* VEHICLE NUMBER */}
                <div className="mb-6">
                    <label className="block text-base font-medium mb-1">Enter Vehicle Number</label>
                    <div className="flex items-center gap-3">
                        <input
                            className={`w-full rounded-md px-3 py-2 bg-blue-50 border ${validPlate || isEdit ? 'bg-gray-200 text-gray-500 border-gray-300' : 'border-blue-200'} focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                            type="text"
                            required
                            value={licensePlate}
                            onChange={(e) => setLicensePlate(e.target.value) || setError("")}
                            disabled={validPlate || validating || isEdit}
                            placeholder="eg: 12ශ්‍රී1234, 50-1234, 250-1234, AB-1234"
                        />
                        <button
                            className={`rounded-md w-40 px-4 py-2.5 text-sm font-medium transition-all duration-200 ${licensePlate === "" || validPlate || isEdit ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 shadow-sm cursor-pointer'}`}
                            type="button"
                            onClick={validatePlate}
                            disabled={validating || validPlate || licensePlate === "" || isEdit}
                        >
                            {validating ? <p className="flex justify-center items-end">Validating<ImSpinner3 className="ml-1 animate-[spin_0.900s_linear_infinite] text-lg" /></p> : <>{validPlate ? <span className="flex items-center justify-around">Validated<SiVerizon /></span> : "Validate"}</>}
                        </button>
                    </div>
                </div>
                {/* ERROR MESSAGE */}
                <div>
                    {error && <p className="text-red-500 italic mb-4">{error}</p>}
                </div>

                {/* NUMBER PLATE TYPE */}
                <div className="mb-6">
                    <label className="block text-base font-medium mb-1">Number Plate Type</label>
                    <input
                        className="w-full rounded-md px-3 py-2 border bg-gray-200 text-gray-500 border-gray-300"
                        type="text"
                        disabled
                        value={plateType}
                    />
                </div>

                {/* OWNER */}
                <div className="mb-6">
                    <label className="block text-base font-medium mb-1">Select Owner (NIC)</label>
                    <select
                        className={`w-full rounded-md px-3 py-2 border ${!validPlate ? 'bg-gray-100 border-gray-200 cursor-not-allowed' : 'bg-blue-50 border-blue-200'} focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                        required
                        value={ownerNic}
                        onChange={(e) => setOwnerNic(e.target.value)}
                        disabled={!validPlate}
                    >
                        <option value="">-- Select Owner --</option>
                        {owners.map(o => (
                            <option key={o.ownerNic} value={o.ownerNic}>
                                {o.firstName} {o.middleName} {o.lastName} ({o.ownerNic})
                            </option>
                        ))}
                    </select>
                </div>

                {/* VEHICLE COLOR */}
                <div className="mb-6">
                    <label className="block text-base font-medium mb-1">Vehicle Color</label>
                    <input
                        className={`w-full rounded-md px-3 py-2 border 
            ${!validPlate ? 'bg-gray-100 border-gray-200 cursor-not-allowed' : 'bg-blue-50 border-blue-200'}
            focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                        required
                        value={vehicleColor}
                        onChange={(e) => setVehicleColor(e.target.value)}
                        disabled={!validPlate}
                    />
                </div>

                {/* VEHICLE TYPE */}
                <div className="mb-6">
                    <label className="block text-base font-medium mb-1">Vehicle Type</label>
                    <select
                        className={`w-full rounded-md px-3 py-2 border 
            ${!validPlate ? 'bg-gray-100 border-gray-200 cursor-not-allowed' : 'bg-blue-50 border-blue-200'}
            focus:ring-2 focus:ring-blue-300 focus:outline-none`}
                        required
                        value={vehicleType}
                        onChange={(e) => setVehicleType(e.target.value)}
                        disabled={!validPlate}
                    >
                        <option value="">-- Select Type --</option>
                        <option value="BIKE">Bike</option>
                        <option value="CAR">Car</option>
                        <option value="VAN">Van</option>
                        <option value="BUS">Bus</option>
                        <option value="LORRY">Lorry</option>
                    </select>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                    type="submit"
                    className={`w-full text-base font-semibold px-4 py-3 rounded-full transition-all duration-200
        ${vehicleType === "" || vehicleColor === "" || ownerNic === ""
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-500 text-white hover:bg-green-600 shadow-md cursor-pointer'}
        `}
                    disabled={vehicleType === "" || vehicleColor === "" || ownerNic === ""}
                >
                    {isEdit ? "Update Vehicle" : "Save Vehicle"}
                </button>
            </form>
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

export default VehicleForm;
