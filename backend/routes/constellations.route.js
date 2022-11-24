const { Router } = require("express");
const { getAllConstellations, getByName, autoComplete } = require("../controllers/constellation.controller");

const router = Router();

router.get('/getAll', getAllConstellations);
router.get('/getByName/:name', getByName);
router.get('/autocomplete/:name', autoComplete);

module.exports = router;