// routesConfig.js
export const routesConfig = [
  {
    path: "/dashboard",
    element: "Dashboard",
    allowedRoles: ["agency", "admin"],
  },
  {
    path: "/admin",
    element: "AdminPanel",
    allowedRoles: ["admin"],
  },
  {
    path: "/volunteer",
    element: "VolunteerPage",
    allowedRoles: ["volunteer", "admin"],
  },
];
