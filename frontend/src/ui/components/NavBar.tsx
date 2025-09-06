import React from "react";

const NavBar: React.FC = () => {
    return (
        <nav className="bg-white shadow-md rounded-b-xl">
            <div className="mx-auto px-4 py-3 flex items-center justify-between">
                <div className="text-2xl font-bold text-blue-600">DoctorNetwork</div>
                <div className="flex items-center space-x-4">
                    {/* User Icon with Profile Dropdown */}
                    <div className="relative group">
                        <button className="flex items-center focus:outline-none">
                            <svg
                                className="w-8 h-8 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </button>
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                            <a
                                href="#"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Profile
                            </a>
                            <a
                                href="#"
                                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Responsive styles */}
            <style>
                {`
                @media (max-width: 640px) {
                    nav .flex.items-center.justify-between {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.5rem;
                    }
                    nav .text-2xl {
                        font-size: 1.25rem;
                    }
                }
                `}
            </style>
        </nav>
    );
};

export default NavBar;