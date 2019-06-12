import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.send('You got the controller!');
});

export default router;