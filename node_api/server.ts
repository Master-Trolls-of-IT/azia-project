// server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const axios = require('axios');

const app = express();
const upload = multer();
const port = 3001;

const corsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('CORS middleware triggered.');
    cors(corsOptions)(req, res, next);
});


app.post('/score', async (req, res) => {
    const requestBody = req.body;
    const apiUrl = 'http://094c4f06-cf15-4f70-acec-bbc6dc47a4b8.francecentral.azurecontainer.io/score';
    const token = 'R6wichgcApXdnfH2tPMz8OPZNJtZfto3';

    try {
        const response = await axios.post(apiUrl, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        res.json(response.data.Results.WebServiceOutput0[0]);
    } catch (error) {
        res.status(500).json({ error: 'Error : ' + error });
    }
});

app.post('/image', upload.single('image'), async (req, res) => {
    const requestBody = req.file.buffer;
    const apiUrl = 'http://ai_cognitive:80/image';

    try {
        const response = await axios.post(apiUrl, requestBody,
            {
                headers: {
                    'Content-Type': 'application/octet-stream',
                },
            });

        res.json(response.data.predictions);
    } catch (error) {
        res.status(500).json({ error: 'Error : ' + error });
    }
});

app.listen(port, () => {
    console.log(`Le serveur écoute sur le port ${port}`);
});
