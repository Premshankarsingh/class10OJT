export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token"); 
}

export const withoutAuthRoutes = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/cms",
];
