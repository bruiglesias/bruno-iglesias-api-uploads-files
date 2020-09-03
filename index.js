const express = require('express');
const multer = require('multer');
const crypto = require('crypto');
const app = express();

app.set('view engine', 'ejs');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, "uploads/");
    },
    filename: (request, file, callback) => {
        const hash = crypto.randomBytes(6).toString('hex');
        const filename = `${hash}-${file.originalname}`;
        callback(null, filename);
    },
})
const upload = multer({storage});

app.get('/', (request, response) => {
    response.render('index');
});

app.post('/uploads', upload.single("file"), (request, response) => {   
    response.send('Arquivo Recebido: ' + request.file.filename);
});

app.listen(8080, () => {
    console.log('Servidor rodando!');
});
