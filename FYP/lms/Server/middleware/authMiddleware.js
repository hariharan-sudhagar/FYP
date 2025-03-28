export const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" }); // Forbidden
    }
    next(); // If admin, proceed
  };
  
  // ✅ Middleware to check if the user is authenticated
  export const isAuthenticated = (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized access" }); // Unauthorized
    }
    next();
  };
  