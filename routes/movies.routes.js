// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model");
const Movie = require("./../models/Movie.model");

// all your routes here
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render("movies/new-movie", { celebrities: celebrities });
    })
    .catch(err => next(err));
});

router.post("/create", (req, res, next) => {
  //  const { title, genre, plot, cast } = req.body;
  Movie.create({ ...req.body }) //* awesome
    .then(() => {
      res.redirect("/movies");
    })
    .catch(err => next(err));
});

/*
router.get("/", (req, res, next) => {
  Movie.find({})
    .then(movie => {
      res.render("movies/movies", { movie });
    })
    .catch(err => {
      next(err);
    });
}); */ //*Try with async/await
router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find(); //console.log(movies);
    res.render("movies/movies", { movies });
  } catch (err) {
    console.log(`Error, getting movies from the db: ${err}`);
    next(err);
  }
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then(movie => {
      console.log(movie);
      res.render("movies/details", movie);
    })
    .catch(error => next(error));
});

// /movies/:id/delete	POST	Delete a specific movie
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => res.redirect("/movies"))
    .catch(error => next(error));
});

/*  /movies/:id/edit	GET	  Show a form to edit a movie
    /movies/:id/edit	POST	Send the data from the form to this route to update the specific movie */
router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  let movie;
  Movie.findById(id)
    .populate("cast")
    .then(movieDoc => {
      movie = movieDoc;
      return Celebrity.find({});
    })
    .then(celebrities => {
      res.render("movies/edit", { celebrities: celebrities, movie });
    })
    .catch(error => next(error));
});

router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  //const { title, genre, plot, cast } = req.body;
  console.log(req.body);
  Movie.findByIdAndUpdate(id, { ...req.body, $inc: { __v: 1 } })
    .then(() => {
      res.redirect(`/movies/${id}`);
    })
    .catch(error => next(error));
});

module.exports = router;
