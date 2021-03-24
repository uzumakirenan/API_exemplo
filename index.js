const express = require('express');
const app = express()
const data = require("./data.json")

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/pages/index.html")
})

app.get("/clients", function(req, res) {
    res.json(data)
})

app.get("/clients/:id", (req, res) => {
    const { id } = req.params
    const client = data.find(cli => cli.id == id)

    if(!client) return res.status(204).json();

    res.json(client)
})

app.post("/clients", (req, res) => {

    //Conteudo Recebido
    const { name, email } = req.body;

    // Logica a ser executado com os dados recebidos, exemplo salvar as informações em um banco

    res.json({ "resposta": "Conteudo da Resposta" })
})

app.put("/clients/:id", (req, res) => {
    const { id } = req.params
    const client = data.find(cli => cli.id == id)

    if(!client) return res.status(204).json();

    const { name, email } = req.body;

    client.name = name
    client.email = email

    res.json(client)

})

app.delete("/clients/:id", (req, res) => {
    const { id } = req.params
    
    //Filtra as informações e exibe todas menos a referente ao ID passado por parametro
    const clientsFiltered = data.filter(client => client.id != id)

    res.json(clientsFiltered)
})


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server is Running")
})