const express = require("express")
const consign = require("consign")
const bodyParser = require("body-parser")
const expressValidator = require("express-validator")

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(expressValidator())

consign()
    .include("./routes")
    .include("./utils")
    .into(app)

app.get('*',function (req, res) {
    res.redirect('/');
});

app.listen(3000, "127.0.0.1", () => {

    console.log("Servidor ligado na porta: ", 3000)

})