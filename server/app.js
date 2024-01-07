const express = require('express');
const app = express();
const cors = require("cors");

const port = 1732;

app.use(cors())


app.get('/:code', async (req, res) => {
    try {
        // Extrai o código da URL
        const code = req.params.code;

        const solicitacao = await fetch(`https://api.linketrack.com/track/json?user=rlordkingvini123@gmail.com&token=a4d30aaaa57a497e1b81ad07a179442c6a384ccdd2db00e3070a22c378b72bb2&codigo=${code}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // Verifica se o fetch retornou 200
        if (!solicitacao.ok) {
            throw new Error(`Fetch não OK: ${solicitacao.statusText}`);
        }

        // Recebe as informações HTTP 
        const info = await solicitacao.json();
        
        // Retorna o JSON 
        res.json(info);
    } 
    catch (error) {
        console.error('Erro inesperado:', error);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
