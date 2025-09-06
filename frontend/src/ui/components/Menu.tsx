import React from "react";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { label: "Tableau de bord", icon: "🏠", href: "/dashboard" },
  { label: "Patients", icon: "🧑‍⚕️", href: "/patient" },
  { label: "Rendez-vous", icon: "📅", href: "/appointment" },
  { label: "Paramètres", icon: "⚙️", href: "/" },
];

type MenuProps = {
  selectedMenu?: string;
  onSelect?: (label: string) => void;
};

const Menu: React.FC<MenuProps> = () => {
  const location = useLocation();
  return (
    <aside
      className="mt-2 ml-2 mb-2 w-64 bg-white text-black flex flex-col rounded-xl shadow-lg"
      style={{ height: "calc(100vh - 4.5rem)" }}
    >
      <nav className="flex-1 px-4 pt-8">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className={`flex items-center px-4 py-2 rounded transition ${
                  location.pathname === item.href
                    ? "bg-gray-200 font-bold"
                    : "hover:bg-gray-200"
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Menu;
