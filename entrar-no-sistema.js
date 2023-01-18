const formularioHTML = document.getElementById('form-cadastro')

const listaLogin = buscarDadosDoLocalStorage('Lista-Usuarios')

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const email = document.getElementById('email-usuario').value;
    const senha = document.getElementById('senha-usuario').value;

    const existe = listaLogin.find((valor) => valor.email === email && valor.senha === senha)

    if (!existe) {
        alert("Senha ou email invalidos, ou não existem!")
        return;
    } else {
        window.location.href = "Listas-recados.html"
    }
    console.log(listaLogin);

    guardarNoLocalStorage('usuarioLogado', existe)
})

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
        return []
    }
}
