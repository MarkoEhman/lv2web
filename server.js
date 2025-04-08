const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/gallery', (req, res) => {
    const dataPath = path.join(__dirname, 'images.json');
    try {
        const images = JSON.parse(fs.readFileSync(dataPath));
        console.log('Images loaded:', images);
        res.render('slike', {
            title: 'Galerija slika',
            images: images
        });
    } catch (error) {
        console.error('Error loading images:', error);
        res.status(500).send('Error loading images');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
