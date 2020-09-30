const path = require('path');
const express = require('express');
const cors = require('cors');
const { startScraping } = require('./scraping');

//Initialize application
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get('/api/links', async(req, res) => {

    //Express time limit for request is 2 min. This override this little problem
    req.setTimeout(0); 

    const baseURL = 'https://en.wikipedia.org/wiki';
    const startPoint = [{ text: 'Dog', href: `${baseURL}/Dog` }];

    try {
        const { nodeDataArray, linkDataArray } = await startScraping(startPoint);
        res.status(200).json({ nodeDataArray, linkDataArray });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

//Production deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
    })
}

//Running server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on localhost: ${port}`));