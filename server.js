const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let juegos = [
    { id: 1, nombre: "The Witcher 3", genero: "RPG", plataforma: "PC", año: 2015 },
    { id: 2, nombre: "God of War", genero: "Acción/Aventura", plataforma: "PS4", año: 2018 },
    { id: 3, nombre: "Minecraft", genero: "Supervivencia", plataforma: "Multiplataforma", año: 2011 },
    { id: 4, nombre: "The Legend of Zelda: Breath of the Wild", genero: "Aventura", plataforma: "Nintendo Switch", año: 2017 },
    { id: 5, nombre: "Red Dead Redemption 2", genero: "Acción/Aventura", plataforma: "Multiplataforma", año: 2018 },
    { id: 6, nombre: "Dark Souls III", genero: "RPG de acción", plataforma: "Multiplataforma", año: 2016 },
    { id: 7, nombre: "Overwatch", genero: "Shooter", plataforma: "Multiplataforma", año: 2016 },
    { id: 8, nombre: "Apex Legends", genero: "Battle Royale", plataforma: "Multiplataforma", año: 2019 },
    { id: 9, nombre: "Hollow Knight", genero: "Metroidvania", plataforma: "Multiplataforma", año: 2017 },
    { id: 10, nombre: "Final Fantasy VII Remake", genero: "RPG", plataforma: "PS4", año: 2020 }
];

app.get('/api/juegos', (req, res) => {
    res.json(juegos);
});

app.post('/api/juegos', (req, res) => {
    const nuevoJuego = { id: juegos.length + 1, ...req.body };
    juegos.push(nuevoJuego);
    res.status(201).json(nuevoJuego);
});

app.get('/api/juegos/genero', (req, res) => {
    const { genero } = req.query; 
    if (!genero) {
        return res.status(400).json({ mensaje: 'Se requiere un género para buscar.' });
    }
    
    const juegosFiltrados = juegos.filter(juego => juego.genero.toLowerCase() === genero.toLowerCase());
    
    if (juegosFiltrados.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron juegos para el género especificado.' });
    }
    
    res.json(juegosFiltrados);
});

app.get('/api/juegos/plataforma', (req, res) => {
    const { plataforma } = req.query; 
    if (!plataforma) {
        return res.status(400).json({ mensaje: 'Se requiere una plataforma para buscar.' });
    }
    
    const juegosFiltrados = juegos.filter(juego => juego.plataforma.toLowerCase() === plataforma.toLowerCase());
    
    if (juegosFiltrados.length === 0) {
        return res.status(404).json({ mensaje: 'No se encontraron resultados' });
    }
    
    res.json(juegosFiltrados);
});

app.put('/api/juegos/:id', (req, res) => {
    const { id } = req.params;
    const index = juegos.findIndex(juego => juego.id == id);

    if (index !== -1) {
        juegos[index] = { id: parseInt(id), ...req.body };
        res.json(juegos[index]);
    } else {
        res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
});

app.delete('/api/juegos/:id', (req, res) => {
    const { id } = req.params;
    const index = juegos.findIndex(juego => juego.id == id);

    if (index !== -1) {
        juegos.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).json({ mensaje: 'Juego no encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});