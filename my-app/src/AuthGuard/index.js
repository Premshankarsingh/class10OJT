export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  return !!localStorage.getItem("token"); 
}

export const withoutAuthRoutes = [
  // USER PANEL...  
  "/",
  "/about-us",
  "/faqs",
  "/favorite-pets",
  "/login",
];
