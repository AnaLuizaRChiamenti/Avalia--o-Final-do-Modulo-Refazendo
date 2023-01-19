
const meuModalEditar = new bootstrap.Modal('#modal-editar')

const usuarioLogado = buscarDadosDoLocalStorage('usuarioLogado')

document.addEventListener('DOMContentLoaded', () => {
    if (!usuarioLogado.email) {
        alert("É preciso realizar o login para entrar nesta pagina!")
        window.location.href = 'Entrar-no-sistema.html'
    } else {
        console.log(usuarioLogado);
        mostrarNoTabelaHTML();
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

    mostrarNoTabelaHTML()

    guardarNoLocalStorage('usuarioLogado', usuarioLogado)
})

function mostrarNoTabelaHTML() {
    tbody.innerHTML = ''

    listaRecados.forEach((valor, index) => {
        tbody.innerHTML += `
        <tr id='${index}'>
            <td>${index + 1}</td>
            <td>${valor.detalhamento}</td>
            <td>${valor.descricao}</td>
            <td>
            <button id="editar" type="button" onclick="botaoEditar(${index})" data-bs-toggle="modal" data-bs-target="#modal-editar" >
                <i class="bi bi-pen"></i>
                Editar
            </button>                 
            
            <button onclick="botaoExcluir(${index})" id="botaoExcluir">Excluir</button> 
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

    salvarRecados()

    localStorage.removeItem('usuarioLogado')
    window.location.href = './Entrar-no-sistema.html'
}

function botaoEditar(indice) {

    const inputEditarDescricao = document.getElementById("editar-descricao");
    const inputEditarDetalhamento = document.getElementById("editar-detalhamento");

    inputEditarDescricao.value = usuarioLogado.recados[indice].descricao
    inputEditarDetalhamento.value = usuarioLogado.recados[indice].detalhamento


    const formularioEditar = document.getElementById('formulario-editar-recados')
    formularioEditar.addEventListener('submit', (evento) => {
        evento.preventDefault()

        // ATUALIZAR A LISTA DE RECADOS
        usuarioLogado.recados[indice].descricao = inputEditarDescricao.value
        usuarioLogado.recados[indice].detalhamento = inputEditarDetalhamento.value
        console.log(usuarioLogado.recados[indice])

        // atualizar o localStorage
        guardarNoLocalStorage('usuarioLogado', usuarioLogado)

        // atualizar o html
        mostrarNoTabelaHTML()

        meuModalEditar.hide()
    })
}

function botaoExcluir(indice) {
    usuarioLogado.recados.splice(indice, 1)
    console.log(usuarioLogado);

    const removerRecados = document.getElementById(indice)
    removerRecados.remove()

    guardarNoLocalStorage('usuarioLogado', usuarioLogado)

    mostrarNoTabelaHTML()
}
