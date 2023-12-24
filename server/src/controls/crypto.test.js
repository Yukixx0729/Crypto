const request = require("supertest");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cryptoRoutes = require("./crypto");

const prisma = new PrismaClient();

const app = express();
app.use("/crypto", cryptoRoutes);

afterAll(async () => {
  await prisma.$disconnect();
});

//test for the date api
describe("GET /crypto/date/:date", () => {
  test("should get all crypto data by date", async () => {
    const response = await request(app).get("/crypto/date/2021-06-30");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(23);
  }, 10000);
});

describe("GET /crypto/date/:date", () => {
  test("should show error if the date is not valid", async () => {
    const response = await request(app).get("/crypto/date/invalid-date");
    expect(response.status).toBe(500);
    expect(response.body).toMatchObject({
      error: "An error occurred ,please try later.",
    });
  });
});

// test for the selected crypto data
describe("GET /crypto/name/:name", () => {
  test("should get selected crypto data with correct date", async () => {
    const response = await request(app)
      .get("/crypto/name/Aave")
      .query({ date: "2021-06-30" });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      id: "893839b3-595c-4c0e-ad5a-bc478ed3ca61",
      date: "2021-06-30T00:00:00.000Z",
      high: 252.12111627,
      low: 220.08141214,
      open: 238.11912654,
      close: 250.38549399,
      volume: 363669939.71,
      marketCap: 3212200185.37,
      cryptoId: "cbad50e2-b138-4c02-8785-00929d7deb3f",
      onedayChange: 0.0575235912735475,
      sevendaysChange: 0.1695296165903358,
      onemonthChange: -0.3463943170153606,
      name: "Aave",
    });
  }, 10000);
});
