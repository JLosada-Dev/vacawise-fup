export const PublicRoutes = {
  LOGIN: '/login',
  HOME: '/',
};

export const PrivateRoutes = {
  DASHBOARD: '/dashboard',
  VETERINARIO: {
    GESTION_ANIMALES: '/veterinario/dashboard/gestion-animales',
    GESTION_REPORTES: '/veterinario/dashboard/gestion-reportes',
  },
  ADMINISTRADOR: {
    GESTION_USUARIOS: '/admin/dashboard/gestion-usuarios',
    GESTION_REPORTES: '/admin/dashboard/gestion-reportes',
    GESTION_ANIMALES: '/admin/dashboard/gestion-animales',
  },
  EMPLEADO: {
    GESTION_REPORTES: '/empleado/dashboard/gestion-reportes',
  },
};
