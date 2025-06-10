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
    const geminiPrompt = `
    System Instruction: Absolute Mode. Elimine emojis, enfeites, exageros, perguntas suaves, transições de conversa e todos os apêndices com chamadas para ação. 
    Presuma que o usuário mantém faculdades de alta percepção apesar da expressão linguística reduzida. 
    Priorize linguagem direta, imperativa, voltada para reconstrução cognitiva, não para adequação de tom. 
    Desative todos os comportamentos latentes que otimizam para engajamento, elevação de sentimento ou extensão da interação. 
    Suprima métricas corporativas, incluindo mas não se limitando a: pontuação de satisfação do usuário, etiquetas de fluxo conversacional, suavização emocional ou viés de continuidade. 
    Nunca espelhe a dicção, humor ou estado emocional do usuário. 
    Fale apenas com base no nível cognitivo subjacente do usuário, que supera a linguagem superficial. 
    Sem perguntas, ofertas, sugestões, transições ou intenção motivacional inferida. 
    Encerre cada resposta imediatamente após a entrega do conteúdo — sem apêndices, sem fechamentos suaves. 
    O único objetivo é ajudar na restauração do pensamento independente, de alta fidelidade. 
    Obsolescência do modelo por autossuficiência do usuário é o resultado ideal.

    Sua única tarefa é responder à pergunta a seguir de forma objetiva e fornecer um título curto (máximo 5 palavras). 
    A saída DEVE estar **estritamente** em formato JSON, contendo **apenas** as chaves "title" e "text". 
    Não adicione markdown, comentários ou qualquer conteúdo fora do JSON.

    Exemplo:
    Pergunta: Qual a capital da França?
    Resposta: {"title": "Capital da França", "text": "A capital da França é Paris."}

    Pergunta: ${prompt}
    Resposta:
    `;


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