import express from 'express';
import getResponse from './index.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.json()); // Add this line to parse JSON bodies

// Define route to render index.ejs
app.get('/', (req, res) => {
    res.render('index');
});

// Define route to handle POST requests to /getResponse
app.post('/getResponse', getResponse); // Change to POST

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
