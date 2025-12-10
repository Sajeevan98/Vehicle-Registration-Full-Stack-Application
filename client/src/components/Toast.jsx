import { useEffect } from "react";

export default function Toast({ message, type = "info", onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => onClose(), 3000); // auto close in 3s
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`
        fixed top-2 right-2 px-4 py-2 rounded shadow-lg text-white
        ${type === "success" && "bg-green-500"}
        ${type === "error" && "bg-red-500"}
        ${type === "info" && "bg-blue-500"}
      `}
        >
            {message}
        </div>
    );
}
