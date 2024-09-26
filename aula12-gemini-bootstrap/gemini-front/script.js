// INPUT DA MENSAGEM DIGITADA PELO USUÁRIO <input>
let inputMessage = document.getElementById("message");

// DIV ONDE IREI EXIBIR AS MENSAGENS DO USUÁRIO E DO ASSISTENTE
let chatLog = document.getElementById("chat-log");

// ARRAY QUE IRÁ SALVAR O HISTÓRICO LOCAL DE MENSAGENS TROCADAS COM O GEMINI
let messagesGemini = [];

const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let messageText = inputMessage.value; // texto digitado pelo usuário

    let newMessageGemini = {
        "role": "user",
        "parts": [{"text": messageText}],
    };

    messagesGemini.push(newMessageGemini);

    inputMessage.value = "";

    console.log(messagesGemini);

    let messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add("message--sent");
    messageElement.innerHTML = `
        <div class="message__text">${messageText}</div>
    `;
    chatLog.appendChild(messageElement);

    // REQUISIÇÃO PARA A MINHA API LOCAL!!!!!!!
    fetch("http://localhost:3000/sendMessage/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messagesGemini
        })
    })
        .then(res => res.json());
});