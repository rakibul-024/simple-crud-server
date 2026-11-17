import express from 'express';

const app = express();
const port = process.env.PORT||5000;

app.get('/', (req, res) => {
  res.send(`
    <body style="background-color: black; color: white;">
      <h1>Hello World!</h1>
    </body>
  `);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});