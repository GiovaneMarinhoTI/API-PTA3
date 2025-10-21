const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');

const app = express();
app.use(cors());

// Ler a planilha de Pokémons
const workbook = xlsx.readFile('pokemons.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

// Rota principal da API
app.get('/api/pokemons', (req, res) => {
  res.json(data);
});

// Rota para buscar Pokémon específico pelo nome
app.get('/api/pokemons/:nome', (req, res) => {
  const nome = req.params.nome.toLowerCase();
  const pokemon = data.find(p => p.Nome.toLowerCase() === nome);
  if (!pokemon) return res.status(404).json({ error: 'Pokémon não encontrado' });
  res.json(pokemon);
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API de Pokémons rodando na porta ${PORT}`));
