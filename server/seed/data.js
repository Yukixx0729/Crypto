const fs = require("fs");
const csv = require("csv-parser");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const cryptoName = [
  "Aave",
  "BinanceCoin",
  "Bitcoin",
  "Cardano",
  "ChainLink",
  "Cosmos",
  "CryptocomCoin",
  "Dogecoin",
  "EOS",
  "Ethereum",
  "Iota",
  "Litecoin",
  "Monero",
  "NEM",
  "Polkadot",
  "Solana",
  "Stellar",
  "Tether",
  "Tron",
  "Uniswap",
  "USDCoin",
  "WrappedBitcoin",
  "XRP",
];

const insertDataIntoDatabase = async (data) => {
  try {
    await prisma.crypto.create({
      data: {
        name: data[0].Name,
        Symbol: data[0].Symbol,
      },
    });
    const cryptoData = await prisma.crypto.findUnique({
      where: {
        name: data[0].Name,
      },
    });
    for (let i = 0; i < data.length; i++) {
      //calculate the differences
      const onedayChange =
        i > 0 && data[i - 1].Close !== 0
          ? (data[i].Close - data[i - 1].Close) / data[i - 1].Close
          : null;
      const sevendaysChange =
        i > 6 && data[i - 7].Close !== 0
          ? (data[i].Close - data[i - 7].Close) / data[i - 7].Close
          : null;
      const onemonthChange =
        i > 29 && data[i - 30].Close !== 0
          ? (data[i].Close - data[i - 30].Close) / data[i - 30].Close
          : null;
      //insert all data
      await prisma.data.create({
        data: {
          date: new Date(data[i].Date),
          high: Number(data[i].High),
          low: Number(data[i].Low),
          open: Number(data[i].Open),
          close: Number(data[i].Close),
          volume: Number(data[i].Volume),
          marketCap: Number(data[i].Marketcap),
          cryptoId: cryptoData.id,
          onedayChange,
          sevendaysChange,
          onemonthChange,
        },
      });
    }
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await prisma.$disconnect();
  }
};

const parseCSV = async (filePath) => {
  const results = [];
  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", () => resolve(results))
      .on("error", (error) => reject(error));
  });
  await insertDataIntoDatabase(results);
};

// parseCSV("../data/coin_Aave.csv");

for (let name of cryptoName) {
  parseCSV(`../data/coin_${name}.csv`);
}
