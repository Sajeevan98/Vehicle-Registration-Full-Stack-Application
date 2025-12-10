import { useState } from "react";
import { GiSriLanka } from "react-icons/gi";
import { IoMdMenu, IoIosCloseCircle } from "react-icons/io";
import { NavLink } from "react-router-dom";

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const activeClass = "text-blue-600 font-semibold border-b-2 border-blue-600 transition-all duration-300";
    const normalClass = "hover:text-blue-600 transition-all duration-300";

    return (
        <nav className="bg-white shadow px-4 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">

                <div className="text-lg font-bold text-blue-500 flex justify-center items-end">
                    <GiSriLanka className="text-4xl text-blue-600" /> <p>Vehicle Registration</p>
                </div>

                {/* for Desktop */}
                <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
                    <NavLink to="/" className={({ isActive }) => isActive ? activeClass : normalClass}>Home</NavLink >
                    <NavLink to="/registries" className={({ isActive }) => isActive ? activeClass : normalClass}>Owners</NavLink >
                    <NavLink to="/register-vehicle" className={({ isActive }) => isActive ? activeClass : normalClass}>Register Vehicle</NavLink >
                    <NavLink to="/register-owner" className={({ isActive }) => isActive ? activeClass : normalClass}>Register Owners</NavLink >
                </ul>
                <button
                    className="md:hidden text-blue-500 text-3xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <IoIosCloseCircle className="text-2xl" /> : <IoMdMenu className="text-2xl" />}
                </button>
            </div>

            {/* for Mobile */}
            <ul className={` md:hidden overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} mt-3 space-y-2 text-gray-700 font-medium px-4`}>
                <NavLink to="/" className="block py-2 hover:text-blue-600" onClick={() => setIsOpen(!isOpen)}>Home</NavLink >
                <NavLink to="/registries" className="block py-2 hover:text-blue-600" onClick={() => setIsOpen(!isOpen)}>Owners</NavLink >
                <NavLink to="/register-vehicle" className="block py-2 hover:text-blue-600" onClick={() => setIsOpen(!isOpen)}>Register Vehicle</NavLink >
                <NavLink to="/register-owner" className="block py-2 hover:text-blue-600" onClick={() => setIsOpen(!isOpen)}>Register Owners</NavLink >
            </ul>
        </nav>
    );
}

export default Navbar;
