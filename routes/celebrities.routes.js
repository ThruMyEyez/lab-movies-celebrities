// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model");
// all your routes here

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  //  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ ...req.body })
    .then(() => {
      res.render("celebrities/celebrities");
    })
    .catch(err => {
      res.render("celebrities/new-celebrity");
      next(err);
    });
});

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then(celebrity => {
      res.render("celebrities/celebrities", { celebrity });
    })
    .catch(err => {
      next(err);
    });
});

router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then(celebrity => {
      console.log(celebrity);
      res.render("celebrities/details", celebrity);
    })
    .catch(error => next(error));
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Celebrity.findByIdAndDelete(id); //.then(() => res.redirect("/celebrities"));
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then(celebrity => {
      res.render("celebrities/edit", celebrity);
    })
    .catch(error => next(error));
});

router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);
  Celebrity.findByIdAndUpdate(id, { ...req.body, $inc: { __v: 1 } })
    .then(() => {
      res.redirect(`/celebrities/${id}`);
    })
    .catch(error => next(error));
});

module.exports = router;
