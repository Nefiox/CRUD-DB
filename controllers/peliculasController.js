let db = require('../database/models');

let peliculasController = {
    crear: (req, res) => {
        db.Genero.findAll()
        .then(function(generos) {
            return res.render('creacionPeliculas', { generos: generos });
        })
    },
    crearMovie: (req, res) => {
        db.Pelicula.create({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.release_date,
            genre_id: req.body.genero,
            length: req.body.length,
            rating: req.body.rating,
        });

        res.redirect('/peliculas')
    },
    listado: (req, res) => {
        db.Pelicula.findAll()
        .then(function(peliculas) {
            res.render('listadoPeliculas', { peliculas: peliculas })
        });
    },
    detalle: (req, res) => {
        db.Pelicula.findByPk(req.params.id, {
            include: [{association: 'genero'}, {association: 'actores'}]
        })
        .then( function(pelicula) {
            res.render('detallePelicula', { pelicula: pelicula })
        })
    },
    editar: (req, res) => {
        let pedidoPelicula = db.Pelicula.findByPk(req.params.id);
        let pedidoGeneros = db.Genero.findAll();

        Promise.all([pedidoPelicula, pedidoGeneros])
        .then(function([pelicula, generos]) {
            res.render('editarPelicula', {pelicula: pelicula, generos: generos})
        })
    },
    actualizar: (req, res) => {
        db.Pelicula.update({
            title: req.body.titulo,
            awards: req.body.premios,
            release_date: req.body.release_date,
            genre_id: req.body.genero,
            length: req.body.length,
            rating: req.body.rating,
        }, {
            where: {
                id: req.params.id
            }
        });

        res.redirect('/peliculas/' + req.params.id);
    },
    borrar: (req, res) => {
        db.Pelicula.destroy({
            where: {
                id: req.params.id
            }
        })
        res.redirect('/peliculas')
    }
}

module.exports = peliculasController;