import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: "Unauthorized: Invalid Token" });
        }

        const user = await User.findById(decoded.userId).select("-password"); // here we use "userId" from the token to get the user from the DB

        if (!user) {
            return res(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protectedRoute middleware", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};