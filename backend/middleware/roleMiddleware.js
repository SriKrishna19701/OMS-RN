const studentRole = (req, res, next) => {
    if (req.user.role !== 'student') {
        return res.status(403).json({ message: 'Access denied: Students only' });
    }
    next();
};

const teacherRole = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied: Teachers only' });
    }
    next();
};

module.exports = { studentRole, teacherRole };