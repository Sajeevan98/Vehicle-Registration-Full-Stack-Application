import { useState } from "react";
import registryClient from "../api/ApiClient";
import vehicleClient from "../api/ApiClient";
import { MdOutlineVerified } from "react-icons/md";
import { mobileNumberFormatter } from "../utils/mobileNumberFormatter";

function RegistryForm({ onSubmit, initialData, isEdit = false }) {

    // only for form-update
    let initialPhone = initialData?.phone || "";
    if (initialPhone.startsWith("+94")) {
        initialPhone = initialPhone.slice(3); // remove country(+94)
    }
    if (initialPhone.startsWith("0")) {
        initialPhone = initialPhone.slice(1); // remove leading 0
    }
    const [firstName, setFirstName] = useState(initialData?.firstName || "");
    const [middleName, setMiddleName] = useState(initialData?.middleName || "");
    const [lastName, setLastName] = useState(initialData?.lastName || "");
    const [ownerNic, setOwnerNic] = useState(initialData?.ownerNic || "");
    const [address, setAddress] = useState(initialData?.address || "");
    const [phone, setPhone] = useState(initialPhone || "");
    const [validNic, setValidNic] = useState(isEdit ? true : false);
    const [verify, setVerify] = useState(false);
    const [error, setError] = useState("");
    const [error2, setError2] = useState("");

    const VerifyExists = async (nic) => {
        try {
            const res = await vehicleClient.get("/registry");
            const vehicleDataList = res.data;
            setError("");
            const exists = vehicleDataList.some(
                veh => {
                    // console.log(veh.ownerNic, " === ", nic);
                    return veh.ownerNic?.trim().toLowerCase() === nic.trim().toLowerCase();
                }
            );

    if (exists) {
        alert("This NIC is already exists!");
        return false;
    }
    return true;

} catch (err) {
    const msg = err.response?.data?.message || "Error loading vehicles...";
    setError(msg);
    return false;
}
    };

// Backend validation for NIC
const validateNic = async () => {
    if (!ownerNic.trim()) {
        setError("Please enter a NIC first!");
        return;
    }

    setVerify(true);
    setError("");

    // checking, Is NIC already exists?
    const status = await VerifyExists(ownerNic);

    if (!status) {
        setVerify(false);
        return;
    }

    try {
        const response = await registryClient.get("/registry/validate", {
            params: { nic: ownerNic }
        });
        const isValid = response.data;
        // console.log("is valid NIC? ", isValid);
        if (isValid) {
            setValidNic(true);
            setError("");
        } else {
            setError("Please Enter Valid NIC!");
        }


    } catch (err) {
        console.error(err);
        setError("Error validating plate!");
    } finally {
        setVerify(false);
    }
};

const handleSubmit = (e) => {
    e.preventDefault();

    const formattedNumber = mobileNumberFormatter(phone);

    if (!formattedNumber) {
        setError2("Invalid Mobile Number!");
        return;
    }
    // setPhone(formattedNumber);

    onSubmit({
        firstName,
        lastName,
        middleName,
        ownerNic,
        phone: formattedNumber,
        address
    });
};

return (
    <form onSubmit={handleSubmit} className="border-2 border-blue-100 px-4 py-5">
        {/* Name Field  */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6">
            <div className="flex flex-col">
                <label className="text-base font-medium mb-1">First Name</label>
                <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 "
                />
            </div>
            <div className="flex flex-col">
                <label className="text-base font-medium mb-1">Middle Name</label>
                <input
                    type="text"
                    placeholder="(optional)"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
            </div>
            <div className="flex flex-col">
                <label className="text-base font-medium mb-1">Last Name</label>
                <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
            </div>
        </div>

        {/* NIC */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6 items-end">
            <div className="flex flex-col">
                <label className="text-base font-medium mb-1">NIC</label>
                <input
                    type="text"
                    required
                    value={ownerNic}
                    onChange={(e) => setOwnerNic(e.target.value)}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 ${isEdit ? 'bg-gray-300' : ''}`}
                    disabled={validNic || isEdit}
                />
            </div>
            {!isEdit ? <button className={`px-4 py-2 rounded-md ${ownerNic === "" || validNic ? 'bg-gray-400 opacity-50 text-white cursor-not-allowed' : 'hover:bg-blue-300 hover:text-white transition duration-200 active:scale-95 bg-white cursor-pointer shadow-sm border'}`}
                disabled={ownerNic === "" || validNic || isEdit}
                onClick={validateNic}
                type="button">
                {verify ? "Verifying..." : "Verify"}
            </button>
                : <></>
            }
            {validNic || isEdit ? <MdOutlineVerified className="text-3xl text-yellow-400" /> : <p className="text-red-500 italic text-base">{error}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6 items-end">
            <div className="flex flex-col">
                <label className="text-base font-medium mb-1">Address</label>
                <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-6 items-end">
            <div className="flex flex-col">
                <label className="text-base font-medium mb-1">Mobile Number</label>
                <input
                    type="text"
                    placeholder="Without country code, Eg: 771234568"
                    required
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value), setError2("") }}
                    className=" w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300"
                />
            </div>
            <p className="text-red-500 italic text-base">{error2}</p>
        </div>

        <button type="submit"
            className={`w-full md:w-auto px-16 py-2 my-8 font-bold rounded-md ${ownerNic === "" || firstName === "" || lastName === "" || address === "" || phone === ""
                ? 'bg-gray-500 opacity-40 text-white cursor-not-allowed'
                : 'hover:bg-blue-400 hover:text-white transition duration-200 active:scale-95 bg-white cursor-pointer shadow-sm border'}`}
            disabled={ownerNic === "" || firstName === "" || lastName === "" || address === "" || phone === ""}
        >
            {isEdit ? "Update" : "Submit"}
        </button>
    </form>
);
}

export default RegistryForm;
