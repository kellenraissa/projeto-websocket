import "dotenv/config"

import registrarEventosCadastro from "./registrarEventos/cadastros.js"
import registrarEventosDocumentos from "./registrarEventos/documento.js"
import registratEventosInicio from "./registrarEventos/inicio.js"
import registrarEventosLogin from "./registrarEventos/login.js"

import io from "./servidor.js"
import autorizarUsuario from "./middlewares/autorizarUsuario.js"

const namespaceUsuarios = io.of("/usuarios")

namespaceUsuarios.use(autorizarUsuario)

namespaceUsuarios.on("connection", socket => {
  registrarEventosDocumentos(socket, namespaceUsuarios)
  registratEventosInicio(socket, namespaceUsuarios)
})

io.of("/").on("connection", socket => {
  registrarEventosCadastro(socket, io)
  registrarEventosLogin(socket, io)
})
