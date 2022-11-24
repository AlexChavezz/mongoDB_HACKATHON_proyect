const { Router } = require("express");
const { getAllConstellations, getByName } = require("../controllers/constellation.controller");

const router = Router();

router.get('/getAll', getAllConstellations);
router.get('/getByName/:name', getByName);

module.exports = router;