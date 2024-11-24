import { encontrarUsuario } from "../db/usuariosDb.js"
import autenticarUsuario from "../utils/autenticarUsuario.js"
import gerarJWT from "../utils/gerarJWT.js"

function registrarEventosLogin(socket, io) {
  //pegar os dados do front pela chave autenticar_usuario
  socket.on("autenticar_usuario", async ({ nome, senha }) => {
    const usuario = await encontrarUsuario(nome)

    if (usuario) {
      const autenticado = autenticarUsuario(senha, usuario)

      if (autenticado) {
        const tokenJwt = gerarJWT({ nomeUsuario: nome })

        socket.emit("autenticacao_sucesso", tokenJwt)
      } else {
        socket.emit("autenticacao_erro")
      }
    } else {
      socket.emit("usuario_nao_encontrado")
    }
  })
}

export default registrarEventosLogin
