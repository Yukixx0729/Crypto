import { PrismaClient } from "@prisma/client";
import express from "express";

const prisma = new PrismaClient();
const router = express.Router();

//get all crypto data by date
router.get("/", async (req, res) => {
    const date = 
});

export default router;
