import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import { socketHandler } from "./src/socket";
import { Server } from "socket.io";
import cors from "cors";
dotenv.config();
import midtrans from "./src/libs/midtrans";

const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3000;
app.use(cors());
io.on("connection", (socket) => {
   socketHandler(socket, io);
});

app.post("/payment", async (req, res) => {
   try {
      const body = {
         products: [
            {
               id: "ITEM1",
               price: 10000,
               quantity: 1,
               name: "Midtrans Bear",
               brand: "Midtrans",
               category: "Toys",
               merchant_name: "Midtrans",
            },
         ],
      };

      // todo insert transaction to database

      const parameter = {
         transaction_details: {
            order_id: "test-transaction-1234111", // id transaction that you get from database
            gross_amount: 10000,
         },
         item_details: body.products,
         callbacks: {
            finish: "http://localhost:3000/finish",
         },
      };

      const result = await midtrans.createTransaction(parameter);

      res.status(200).send({ result });
   } catch (err) {
      console.log(err);

      res.status(500).send({ message: (err as Error).message });
   }
});

server.listen(port, () =>
   console.log(`Example app listening on port ${port}!`)
);
