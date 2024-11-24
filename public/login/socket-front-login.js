import { definirCookie } from "../utils/cookie.js"

const socket = io()

function emitirAutenticarUsuario(dados) {
  socket.emit("autenticar_usuario", dados)
}

socket.on("autenticacao_sucesso", tokenJwt => {
  console.log(tokenJwt, "TOKEN")
  definirCookie("tokenJwt", tokenJwt)

  alert("Usuário autenticado com sucesso!")
  window.location.href = "/"
})
socket.on("autenticacao_erro", () => alert("Erro na autenticação"))
socket.on("usuario_nao_encontrado", () => alert("Usuário não encontrado"))

export { emitirAutenticarUsuario }
