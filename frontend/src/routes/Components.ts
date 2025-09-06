import Appointment from "../ui/pages/appointment/Appointment";
import Dashboard from "../ui/pages/dashboard/Dashboard";
import Patient from "../ui/pages/patients/Patient";
import Wrapper from "../ui/pages/wrapper";


 

export const Components = [
  {
    key: "dashboard",
    path: "/dashboard",
    component: Wrapper(Dashboard),
  },
  {
    key: "patient",
    path: "/patient",
    component: Wrapper(Patient),
  },
  {
    key: "appointment",
    path: "/appointment",
    component: Wrapper(Appointment),
  },

  // {
  //   key: "register",
  //   path: "/register",
  //   component: Register,
  // },
  // {
  //   key: "profile",
  //   path: "/profile",
  //   component: Profile,
  // },
  // {
  //   key: "settings",
  //   path: "/settings",
  //   component: Settings,
  // },
  // {
  //   key: "notFound",
  //   path: "*",
  //   component: NotFound,
  // },
]
