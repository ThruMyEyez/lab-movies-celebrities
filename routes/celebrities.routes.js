// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("./../models/Celebrity.model");
//* all your routes here

router.get("/", async (req, res, next) => {
  try {
    const celebs = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrity: celebs });
  } catch (error) {
    next(error);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    res.render("celebrities/new-celebrity");
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    await Celebrity.create({ ...req.body });
    res.render("celebrities/celebrities");
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const celebrity = await Celebrity.findById(id);
    res.render("celebrities/details", celebrity);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Celebrity.findByIdAndDelete(id);
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const celebrity = await Celebrity.findById(id);
    res.render("celebrities/edit", celebrity);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Celebrity.findByIdAndUpdate(id, { ...req.body, $inc: { __v: 1 } });
    res.redirect(`/celebrities/${id}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

/* router.post("/create", (req, res, next) => {
  //  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ ...req.body })
    .then(() => {
      res.render("celebrities/celebrities");
    })
    .catch(err => {
      res.render("celebrities/new-celebrity");
      next(err);
    });
}); */

/*
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then(celebrity => {
      console.log(celebrity);
      res.render("celebrities/celebrities", { celebrity });
    })
    .catch(err => {
      next(err);
    });
}); */

/*
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then(celebrity => {
      res.render("celebrities/details", celebrity);
    })
    .catch(error => next(error));
});
*/

/*
router.get("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then(celebrity => {
      res.render("celebrities/edit", celebrity);
    })
    .catch(error => next(error));
});
*/

/*
router.post("/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndUpdate(id, { ...req.body, $inc: { __v: 1 } })
    .then(() => {
      res.redirect(`/celebrities/${id}`);
    })
    .catch(error => next(error));
});
*/
