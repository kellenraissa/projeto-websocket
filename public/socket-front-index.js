import { inserirLinkDocumento, removerLinkDocumento } from "./index.js"
import { obterCookie } from "./utils/cookie.js"

//forma de passsar  o token pro back-end antes mesmo da conexão com o servidor, pois usamos um middleware netx()
//qualquer cliente  que estiver tentnado se autenticar vai passar pela /usuarios passando o jwt
const socket = io("/usuarios", {
  auth: {
    token: obterCookie("tokenJwt"),
  },
})

socket.on("connect_error", erro => {
  alert(erro)
  window.location.href = "/login/index.html"
})

socket.emit("obter_documentos", documentos => {
  documentos.forEach(documento => {
    inserirLinkDocumento(documento.nome)
  })
})

function emitirAdicionarDocumento(nome) {
  socket.emit("adicionar_documento", nome)
}

socket.on("adicionar_documento_interface", nome => {
  inserirLinkDocumento(nome)
})

socket.on("documento_existente", nome => {
  alert(`O documento ${nome} já existe!`)
})

socket.on("excluir_documento_sucesso", nome => {
  removerLinkDocumento(nome)
})

export { emitirAdicionarDocumento }
