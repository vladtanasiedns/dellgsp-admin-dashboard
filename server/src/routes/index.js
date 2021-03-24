import express from 'express';

var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send({
    "message": "Hello World"
  });
});

export default router;
