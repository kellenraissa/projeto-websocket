import { emitirAutenticarUsuario } from "./socket-front-login.js"

const form = document.getElementById("form-login")

form.addEventListener("submit", event => {
  event.preventDefault()

  const nome = form["input-usuario"].value
  const senha = form["input-senha"].value

  emitirAutenticarUsuario({ nome, senha })
})
