export function requireRole(roleCode) {
  return (req, res, next) => {
    const roles = req.user?.roles || [];
    if (!roles.includes(roleCode)) {
      return res.status(403).json({ message: "Forbidden - missing role" });
    }
    next();
  };
}
