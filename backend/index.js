const express =  require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", (req, res) => {
    const { question } = req.body;
    
    res.json({
        answer: `Recebi a tua pergunta: "${question}"`
    });
});

app.listen(4000, () => {
  console.log("Servidor a correr em http://localhost:4000");
});
