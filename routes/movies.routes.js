// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("./../models/Celebrity.model");
const Movie = require("./../models/Movie.model");

// all your routes here
router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    console.log(`Error, getting movies from the db: ${error}`);
    next(error);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const celebs = await Celebrity.find();
    res.render("movies/new-movie", { celebrities: celebs });
  } catch (error) {
    console.log(`Error, getting celebs from the db: ${error}`);
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    await Movie.create({ ...req.body });
    res.redirect("/movies");
  } catch (error) {
    console.log(`Error, creating movie in the db: ${error}`);
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");
    res.render("movies/details", movie);
  } catch (error) {
    console.log(`Error, getting movies by ID from the db: ${error}`);
    next(error);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.redirect("/movies");
  } catch (error) {
    console.log(`Error, deleting movie from the db: ${error}`);
    next(error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate("cast");
    const celebs = await Celebrity.find();
    res.render("movies/edit", { celebrities: celebs, movie });
  } catch (error) {
    console.log(`Error, getting movies or celebs from the db: ${error}`);
    next(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndUpdate(id, { ...req.body, $inc: { __v: 1 } });
    res.redirect(`/movies/${id}`);
  } catch (error) {
    console.log(`Error, updating movie in the db: ${error}`);
    next(error);
  }
});

module.exports = router;
/*
router.get("/create", (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render("movies/new-movie", { celebrities: celebrities });
    })
    .catch(err => next(err));
});
*/
/*
router.post("/create", (req, res, next) => {
  //  const { title, genre, plot, cast } = req.body;
  Movie.create({ ...req.body }) //* awesome
    .then(() => {
      res.redirect("/movies");
    })
    .catch(err => next(err));
});*/

/*
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then(movie => {
      console.log(movie);
      res.render("movies/details", movie);
    })
    .catch(error => next(error));
});*/

/*
router.post("/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Movie.findByIdAndDelete(id)
    .then(() => res.redirect("/movies"))
    .catch(error => next(error));
});
*/

/*
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
*/

/*
router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  //const { title, genre, plot, cast } = req.body;
  console.log(req.body);
  Movie.findByIdAndUpdate(id, { ...req.body, $inc: { __v: 1 } })
    .then(() => {
      res.redirect(`/movies/${id}`);
    })
    .catch(error => next(error));
}); */
