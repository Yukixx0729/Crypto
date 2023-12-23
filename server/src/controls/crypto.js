const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

//get all crypto data by date
router.get("/date/:date", async (req, res) => {
  const { date } = req.params;

  const startDate = new Date(`${date}T00:00:00.000Z`);
  const endDate = new Date(`${date}T23:59:59.999Z`);
  try {
    const data = await prisma.data.findMany({
      where: {
        date: {
          gte: startDate,
          lt: endDate,
        },
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred ,please try later." });
  }
});

//get crypto data by name
router.get("/name/:name", async (req, res) => {
  const { name } = req.params;
  console.log(name);
  try {
    const data = await prisma.crypto.findUnique({
      where: {
        name: name,
      },
      include: {
        data: true,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred ,please try later." });
  }
});

module.exports = router;
