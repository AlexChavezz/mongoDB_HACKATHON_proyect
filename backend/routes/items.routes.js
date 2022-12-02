const { Router } = require("express");
const {  getByName, autoComplete } = require("../controllers/items.controllers");

const router = Router();

// router.get('/getAll', getAllConstellations);
router.get('/getByName/:name', getByName);
router.get('/autocomplete/:name', autoComplete);

module.exports = router;