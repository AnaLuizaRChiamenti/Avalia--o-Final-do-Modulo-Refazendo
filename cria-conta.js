
const formularioHTML = document.getElementById('form-criar-conta')

const listaCadastros = buscarDadosDoLocalStorage('Lista-Usuarios')
console.log(listaCadastros)

const feedbackHTML = window.document.getElementById('feedback')

formularioHTML.addEventListener('submit', (evento) => {
    evento.preventDefault()

    const email = document.getElementById('email-usuario').value;

    const senha = document.getElementById('senha-usuario').value;

    const repetirSenha = document.getElementById('repetir-senha-usuario').value;

    const feedbackHTML = document.getElementById('feedback')


    const verificaEmail = listaCadastros.some((valor) => valor.email === email)

    if (verificaEmail) {
        feedbackHTML.innerText = ("Email ja cadastrado. Tente novamente!")

        setTimeout(() => {
            feedbackHTML.innerText = ''
        }, 3000)

        return;
    }
    

    if (senha !== repetirSenha) {
        feedbackHTML.innerText = ("As senhas não conferem. Tente novamente!")

        setTimeout(() => {
            feedbackHTML.innerText = ''
        }, 3000)

        return;
    }

    const novoCadastro = {
        email,
        senha,
        repetirSenha,
        recados: []
    }

    listaCadastros.push(novoCadastro)

    guardarNoLocalStorage('Lista-Usuarios', listaCadastros)
    formularioHTML.reset()

    console.log(listaCadastros);

    if (novoCadastro) {
        feedbackHTML.innerText = ("Conta criada!")

        setTimeout(() => {
            feedbackHTML.innerText = ''
            window.location.href = './Entrar-no-sistema.html'
        }, 2000)
        return;
    }
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