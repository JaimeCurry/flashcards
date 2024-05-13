const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const API = require('./rutas/Api');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

API(app);
app.use(express.static('./public/browser'));

var server = app.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
