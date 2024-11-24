import criaHashESalsenha from "../utils/criaHashESalSenha.js";
import { usuariosColecao } from "./dbConnect.js";

function encontrarUsuario(nome) {
    return usuariosColecao.findOne({nome})
}

function cadastrarUsuario({nome, senha}) {

    const {hashSenha, salSenha} = criaHashESalsenha(senha)
    return usuariosColecao.insertOne({ nome, hashSenha, salSenha})
}

export { cadastrarUsuario, encontrarUsuario}