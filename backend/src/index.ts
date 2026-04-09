import express from 'express';
import cors from 'cors';
import { getDb } from './db/database';
import apiRoutes from './routes/api';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

getDb().then(() => {
    console.log('Banco de dados iniciado.');

    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Falha ao inicializar o banco de dados:', err);
});