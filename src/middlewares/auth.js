const adminAuth = (req, res, next) => {
    const token = "vamsi is good"; 
    const isAdminAuthorized = token === "vamsi is good"; 

    if (!isAdminAuthorized) {
        res.status(401).send("Unauthorized request")
    }
    else {
        next();
    }
}

module.exports = {
    adminAuth
}
