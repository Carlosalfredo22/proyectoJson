const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar Multer para imágenes
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, path.join(__dirname, 'public/uploads')),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
  })
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Base de datos temporal en memoria
const alumnos = [];

// Rutas
app.get('/', (req, res) => {
  res.send(`
    <h1>Sistema Escolar</h1>
    <a href="/nuevo">Registrar Alumno</a> | <a href="/">Ver Lista</a>
    <hr>
    <div style="display:flex; gap:20px; flex-wrap:wrap;">
      ${alumnos.length === 0 ? '<p>No hay alumnos.</p>' : alumnos.map(a => `
        <div style="border:1px solid #ccc; padding:10px; text-align:center;">
          <img src="${a.foto}" width="100" height="100" style="object-fit:cover; border-radius:50%"><br>
          <b>${a.nombre}</b><br><small>${a.grado}</small>
        </div>
      `).join('')}
    </div>
  `);
});

app.get('/nuevo', (req, res) => {
  res.send(`
    <div style="background-color: #2563eb; color: white; padding: 15px; text-align: center; font-family: sans-serif;">
      <h1>🏫 Sistema Escolar - Panel de Control</h1>
      <p>Estado del servidor: <strong>En línea (Nodemon + Docker)</strong></p>
    </div>
    
    <div style="padding: 20px; font-family: sans-serif;">
      <h2>Registrar Alumno</h2>
      <form action="/nuevo" method="POST" enctype="multipart/form-data">
        <input type="text" name="nombre" placeholder="Nombre completo" required><br><br>
        <input type="text" name="grado" placeholder="Grado / Sección" required><br><br>
        <input type="file" name="foto" accept="image/*" required><br><br>
        <button type="submit" style="background-color: #16a34a; color: white; border: none; padding: 10px 15px; cursor: pointer;">Guardar Alumno</button>
      </form>
      <br><a href="/">Volver al inicio</a>
    </div>
  `);
});

app.post('/nuevo', upload.single('foto'), (req, res) => {
  alumnos.push({
    nombre: req.body.nombre,
    grado: req.body.grado,
    foto: `/uploads/${req.file.filename}` }); res.redirect('/'); });  app.listen(PORT, () => console.log(`http://localhost:${PORT}`));