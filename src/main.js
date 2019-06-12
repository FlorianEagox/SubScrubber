import express from 'express';
import ExampleController from './controllers/example_controller';

const PORT = 3002;

async function main() {
  const app = express();

  app.set('view engine', 'pug');
  app.set('views', './views');

  app.get('/', (req, res) => {
    res.render('index');
  });

  // app.use('/c', ExampleController);

  app.listen(PORT, _ => {
    console.log(`Listening on port ${PORT}`);
  });
}

main();