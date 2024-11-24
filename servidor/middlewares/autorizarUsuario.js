import jwt from "jsonwebtoken"

function autorizarUsuario(socket, next) {
  //pegar uma conexão que está tentando ser estabelecida handshake
  //auth do front no socke.io
  const tokenJwt = socket.handshake.auth.token

  try {
    //verifica se o token é valido
    const payloadToken = jwt.verify(tokenJwt, process.env.SEGREDO_JWT)

    socket.emit("autorizacao_sucesso", payloadToken)

    next()
  } catch (erro) {
    next(erro)
  }
}

export default autorizarUsuario
