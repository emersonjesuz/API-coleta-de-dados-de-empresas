const instanciaAxios = require("../connect/api");

const fs = require("fs/promises");

async function showEmpresas(req, res) {
  const { dominioEmpresa } = req.query;

  if (!dominioEmpresa)
    return res.status(400).json({ message: "Informe o dominio da empresa !" });
  const chavePrivada = "08573f698219452a82da52ee02454d69";
  try {
    const { data } = await instanciaAxios.get(
      `/?api_key=${chavePrivada}&domain=${dominioEmpresa}`
    );

    if (!data.name)
      return res.status(404).json({ message: "Dominio não encontrado!" });

    const pegandoEmpresasJson = await fs.readFile("./empresas.json");
    const empresas = JSON.parse(pegandoEmpresasJson);
    empresas.push(data);
    const alterandoEmpresasJson = JSON.stringify(empresas);
    await fs.writeFile("./empresas.json", alterandoEmpresasJson);

    res.json(data);
  } catch (error) {
    if (error.message === "Request failed with status code 400")
      return res
        .status(400)
        .json({ message: "Dominio informado esta incorreto!" });

    res.status(500).json(error);
  }
}

module.exports = {
  showEmpresas,
};
