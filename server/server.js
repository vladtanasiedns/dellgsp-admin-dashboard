import express from 'express';
import index from './src/routes/index';

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/", index);


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`))

