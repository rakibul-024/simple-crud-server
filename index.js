import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
 import 'dotenv/config'

const app = express();
const port = process.env.PORT||5000;
//middleware
app.use(cors());
app.use(express.json());

 console.log('DB_USER:', process.env.DB_USER);

const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cac5e1u.mongodb.net/`);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
};
await connectToMongoDB();

// Call this only when your application terminates
// export async function disconnectFromMongoDB() {
//   await client.close();
// }


app.get('/', (req, res) => {
  res.send('Simple CRUD server is runnning' );
});

app.listen(port, () => {
  console.log(`Simple CRUD server is runing on port ${port}`);
});