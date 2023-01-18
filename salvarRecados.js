
const usuarioLogado = buscarDadosDoLocalStorage('usuarioLogado')

document.addEventListener('DOMContentLoaded', () => {
    if (!usuarioLogado.email) {
        alert("Não existe")
        window.location.href = 'Entrar-no-sistema.html'
    } else {
        console.log(usuarioLogado);
        mostarRecadosNoHTML();
    }
})

const listaRecados = usuarioLogado.recados

const formulario = document.getElementById('formulario-recado')

const tbody = document.getElementById('registros')

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const descricao = document.getElementById('descricao').value;
    const detalhamento = document.getElementById('detalhamento').value;

    const novoRecado = {
        descricao: descricao,
        detalhamento: detalhamento,
    }

    listaRecados.push(novoRecado)
    salvarRecados()

    formulario.reset()

    mostarRecadosNoHTML()

    guardarNoLocalStorage('usuarioLogado', usuarioLogado)
})

function mostarRecadosNoHTML() {
    tbody.innerHTML = ''

    listaRecados.forEach((valor, index) => {
        tbody.innerHTML += `
        <tr id='${index}'>
            <td>${index + 1}</td>
            <td>${valor.detalhamento}</td>
            <td>${valor.descricao}</td>
            <td>
                <button onclick="botaoEditar()">Editar</button>    
                <button onclick="botaoExcluir(${index})">Excluir</button> 
            </td>
        </tr>
        `
    })
}

function salvarRecados() {
    const listaUsuario = buscarDadosDoLocalStorage('Lista-Usuarios')

    const acharUsuario = listaUsuario.findIndex((valor) => valor.email === usuarioLogado.email)

    listaUsuario[acharUsuario].recados = listaRecados

    guardarNoLocalStorage('Lista-Usuarios', listaUsuario)
}

function guardarNoLocalStorage(chave, valor) {
    const valorJSON = JSON.stringify(valor)

    localStorage.setItem(chave, valorJSON)

}

function buscarDadosDoLocalStorage(chave) {

    const dadoJSON = localStorage.getItem(chave)

    if (dadoJSON) {
        const listaDados = JSON.parse(dadoJSON)
        return listaDados
    } else {
        return {}
    }
} 

function deslogar() {
    localStorage.removeItem('usuarioLogado')
    window.location.href = './Entrar-no-sistema.html'
}

function botaoEditar() {

}

function botaoExcluir(indice) {
    usuarioLogado.recados.splice(indice, 1)
    console.log(usuarioLogado);

    const removerRecados = document.getElementById(indice)
    removerRecados.remove()
    
    guardarNoLocalStorage('usuarioLogado', usuarioLogado)

    salvarRecados()

    mostarRecadosNoHTML()
} // apaga apenas 4 recados

