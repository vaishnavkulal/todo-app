import { Router } from "express";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import z from "zod";
import jwt from "jsonwebtoken";

const userRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET; 

// --- SIGNUP ROUTE ---
userRouter.post('/signup', async (req, res) => {
    // 1. Define Validation Schema
    const requiredBody = z.object({
        email: z.string().min(3).max(50).email(),
        password: z.string().min(6).max(50), 
        name: z.string().min(2).max(50),
        role: z.string().min(1).max(10).optional() 
    });

    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input format",
            error: parsedData.error.errors
        });
    }


    const { email, password, name, role } = parsedData.data;

    try {
        // 4. Check for existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 5. Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 6. Create User
        await userModel.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role || "user" 
        });

        res.status(201).json({
            message: "Signup successful"
        });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

userRouter.post('/signin', async (req, res) => {
    // 1. Define Validation Schema
    const requiredBody = z.object({
        email: z.string().min(3).email(),
        password: z.string().min(3),
    });

    // 2. Validate Input
    const parsedData = requiredBody.safeParse(req.body);

    if (!parsedData.success) {
        return res.status(400).json({
            message: "Invalid input format",
            error: parsedData.error.errors
        });
    }

    const { email, password } = parsedData.data;

    try {
        const user = await userModel
            .findOne({ email: email })
            .select("+password");

        if (!user) {
            return res.status(403).json({
                message: "Invalid credentials"
            });
        }
        if (!user.password) {
            return res.status(500).json({
                message: "User account corrupted (no password set). Please reset password."
            });
        }

        // 4. Compare Password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (isPasswordMatch) {
            if (!JWT_SECRET) {
                console.error("JWT_SECRET is missing in .env");
                return res.status(500).json({ message: "Server configuration error" });
            }

            const token = jwt.sign({ id: user._id }, JWT_SECRET);

            res.status(200).json({
                message: "Signin successful",
                token: token
            });
        } else {
            res.status(403).json({
                message: "Invalid credentials"
            });
        }
    } catch (err) {
        console.error("Signin Error:", err);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

export default userRouter;