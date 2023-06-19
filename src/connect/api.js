const axios = require("axios");

const instanciaAxios = axios.create({
  baseURL: `https://companyenrichment.abstractapi.com/v1`,
  timeout: 10000,
});

module.exports = instanciaAxios;
