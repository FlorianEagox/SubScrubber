import express from 'express';

const PORT = 8000;

async function main() {
  const app = express();

  app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

  app.listen(PORT, _ => {
    console.log(`Listening on port ${PORT}`);
  });
}

main();