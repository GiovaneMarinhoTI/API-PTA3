const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');

const app = express();
app.use(cors());

// -----------------------------
// Função genérica para ler planilha
// -----------------------------
function carregarPlanilha(nomeArquivo) {
    const workbook = xlsx.readFile(nomeArquivo);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
}

// -----------------------------
// Ler as três planilhas
// -----------------------------
const pokemons = carregarPlanilha('pokemons.xlsx');
const ataques = carregarPlanilha('ataques.xlsx');
const passivas = carregarPlanilha('passivas.xlsx');

// -----------------------------
// Rotas de Pokémons
// -----------------------------
app.get('/api/pokemons', (req, res) => {
  res.json(pokemons);
});

app.get('/api/pokemons/:nome', (req, res) => {
  const nome = req.params.nome.toLowerCase();
  const pokemon = pokemons.find(p => p.Nome?.toLowerCase() === nome);
  if (!pokemon) return res.status(404).json({ error: 'Pokémon não encontrado' });
  res.json(pokemon);
});

// -----------------------------
// Rotas de Ataques
// -----------------------------
app.get('/api/ataques', (req, res) => {
  res.json(ataques);
});

app.get('/api/ataques/:name', (req, res) => {
  const name = req.params.name.toLowerCase();
  const ataque = ataques.find(a => a.Name?.toLowerCase() === name);
  if (!ataque) return res.status(404).json({ error: 'Ataque não encontrado' });
  res.json(ataque);
});

// -----------------------------
// Rotas de Passivas
// -----------------------------
app.get('/api/passivas', (req, res) => {
  res.json(passivas);
});

app.get('/api/passivas/:stat', (req, res) => {
  const stat = req.params.stat.toLowerCase();
  const passiva = passivas.find(p => p.Stat_Passives?.toLowerCase() === stat);
  if (!passiva) return res.status(404).json({ error: 'Passiva não encontrada' });
  res.json(passiva);
});

// -----------------------------
// Iniciar Servidor
// -----------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));
