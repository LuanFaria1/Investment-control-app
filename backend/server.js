require('dotenv').config();
const express = require('express');
const cors = require('cors');
const investmentRoutes = require('./routes/investmentRoutes');
const cashFlowRoutes = require('./routes/cashFlowRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/investments', investmentRoutes);
app.use('/api/cashflow', cashFlowRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Servidor backend rodando na porta ${PORT}`));
