export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('You do not have permission to access this resource');
        }
        next();
    };
};
