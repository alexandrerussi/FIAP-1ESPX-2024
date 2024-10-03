import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// IMPORTANDO O GEMINI
import { GoogleGenerativeAI } from "@google/generative-ai";

// CONFIGURAR O ENDPOINT 

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

// CRIANDO O ENDPOINT PARA RECEBER E ENVIAR MENSAGEMS À API DO GEMINI E RETORNAR A RESPOSTA PARA O FRONT-END

app.post("/sendMessage", async (req, res) => {

    const { messagesGemini } = req.body;
    console.log(messagesGemini[0]);

    // Acessando a API do Gemini via sua API Key
    const genAI = new GoogleGenerativeAI("AIzaSyCxzm4caMHTFWKiGJS_PQdcPj-AnC6V8XI");

    // Instanciando o modelo
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // colocando o prompt
    const prompt = messagesGemini[0].parts[0].text;

    // enviando o prompt para o gemini e ESPERANDO a resposta dele
    const result = await model.generateContent(prompt);
    console.log(result.response.text());

    res.json({
        chat_completion: result.response.text()
    })

});

app.listen(port, () => {
    console.log(`Exemplo de app consumindo http://localhost:${3000}`)
})