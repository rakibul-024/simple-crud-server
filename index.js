import express from 'express';
import { Db, MongoClient,ObjectId } from 'mongodb';
import cors from 'cors';
 import 'dotenv/config'

const app = express();
const port = process.env.PORT||5000;
//middleware
app.use(cors());
app.use(express.json());

 console.log('DB_USER:', process.env.DB_USER);
// console.log('DB_PASS:', process.env.DB_PASS);
const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cac5e1u.mongodb.net/`);
// const client = new MongoClient(`mongodb+srv://simpleCrudUser:
export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
};
// Call this only when your application terminates
const connectedClient = await connectToMongoDB();
const db = connectedClient.db('simpleCrudDB');
const users = db.collection('users');


// Call this only when your application terminates
// export async function disconnectFromMongoDB() {
//   await client.close();
// }


app.get('/', (req, res) => {
  res.send('Simple CRUD server is runnning' );
});
//get all users
app.get('/users', async (req, res) => {
  const cursor = users.find({});
  const allUsers = await cursor.toArray();
  res.send(allUsers);
});
//get a single user by id
app.get('/users/:id', async (req, res) => {
  console.log('params in the server:', req.params);
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await users.findOne(query);
  res.send(result);
});
//add a new user
app.post('/profile', async (req, res) => {
  const newUser = req.body;
  console.log('Adding new user:', newUser);
  const result = await users.insertOne(newUser);
  res.send(result);
});

// update a user by id
app.patch('/users/:id', async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  console.log('Updating user with id:', id, 'with data:', updatedUser);
  
  const filter = { _id: new ObjectId(id) };
   const options = { upsert: true };
  const updatedDoc = {
    $set:{
      name: updatedUser.name,
      email: updatedUser.email
    }
  };
  
  const result = await users.updateOne(filter, updatedDoc);
  res.send(result);
});

//delete a user by id
app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await users.deleteOne(query);
  res.send(result);
});

app.listen(port, () => {
  console.log(`Simple CRUD server is runing on port ${port}`);
});