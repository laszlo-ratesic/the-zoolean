const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');

router.get("/animals", (req, res) => {
  let results = animals;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get("/animals/:id", (req, res) => {
  const result = findById(req.params.id, animals);
  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
});

router.post("/animals", (req, res) => {
  //req.body is where the incoming data will be
  // set id based on on the next index of array
  req.body.id = animals.length.toString();

  // if any data in req.body is incorrect, send 400 error
  if (!validateAnimal(req.body)) {
    res.status(400).send("The animal is not properly formatted.");
  } else {
    // add animal to JSON file and animals array
    const animal = createNewAnimal(req.body, animals);
    res.json(req.body);
  }
});

module.exports = router;