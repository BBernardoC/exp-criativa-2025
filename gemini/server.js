import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' }); 

const app = express();
const port = 3001; // Porta servidor gemini

app.use(cors({
    origin: 'http://localhost:5173' 
}));
app.use(express.json());

const API_KEY = process.env.GOOGLE_API_KEY;

if (!API_KEY) {
    console.error('Erro: A chave de API GOOGLE_API_KEY não foi definida no arquivo .env.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post('/api/gemini-chat', async (req, res) => {
    const { prompt } = req.body;
    const geminiPrompt = `Gere uma resposta detalhada para a seguinte pergunta, e também forneça um título conciso (com no máximo 5 palavras) para essa resposta. A saída DEVE ser estritamente em formato JSON, com as chaves "title" e "text", sem nenhum texto adicional antes ou depois do JSON.

    Exemplo:
    Pergunta: Qual a capital da França?
    Resposta: {"title": "Capital da França", "text": "A capital da França é Paris."}

    Pergunta: ${prompt}
    Resposta:`;

    try {
        const result = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts: [{ text: geminiPrompt }]
                }
            ]
        });

        let responseText = result.response.text();
        const jsonMatch = responseText.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
            responseText = jsonMatch[1]; 
        }

        let parsedResponse;
        try {
            parsedResponse = JSON.parse(responseText);
        } catch (jsonError) {
            console.error('Erro ao analisar JSON da resposta do Gemini:', jsonError);
            console.warn('Resposta original do Gemini:', responseText);

            return res.status(500).json({ error: 'Formato de resposta inesperado da IA. Tente novamente.' });
        }

        if (parsedResponse.title && parsedResponse.text) {
            res.json({ title: parsedResponse.title, text: parsedResponse.text });
        } else {
            console.warn('JSON do Gemini não contém "title" ou "text" conforme esperado.', parsedResponse);
            res.status(500).json({ error: 'Resposta incompleta da IA. Tente novamente.' });
        }

    } catch (error) {
        console.error('Erro ao chamar a API do Gemini:', error);
        res.status(500).json({ error: 'Erro ao gerar conteúdo com a API Gemini.' });
    }
});

app.listen(port, () => {
    console.log(`Gemini Proxy server listening at http://localhost:${port}`);
});