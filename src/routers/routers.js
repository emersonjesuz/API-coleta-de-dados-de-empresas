const express = require("express");
const { showEmpresas } = require("../controllers/controllers");

const router = express();

router.get("/empresas", showEmpresas);

module.exports = router;
