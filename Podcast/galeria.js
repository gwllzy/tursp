// Galeria independente para cada episódio; um único visualizador para a página.
const visualizador = document.getElementById('visualizador');
const imagemAmpliada = document.getElementById('visualizador-imagem');
const legenda = document.getElementById('visualizador-legenda');
const botaoAnterior = document.querySelector('.visualizador-anterior');
const botaoProxima = document.querySelector('.visualizador-proxima');
const botaoFechar = document.querySelector('.visualizador-fechar');

let fotosAtuais = [];
let indiceAtual = 0;
let botaoDeOrigem = null;

function exibirFoto(indice) {
    if (!fotosAtuais.length) return;
    indiceAtual = (indice + fotosAtuais.length) % fotosAtuais.length;
    const foto = fotosAtuais[indiceAtual].querySelector('img');
    imagemAmpliada.src = foto.currentSrc || foto.src;
    imagemAmpliada.alt = foto.alt;
    legenda.textContent = `${foto.alt} — ${indiceAtual + 1} de ${fotosAtuais.length}`;
    botaoAnterior.hidden = fotosAtuais.length < 2;
    botaoProxima.hidden = fotosAtuais.length < 2;
}

document.querySelectorAll('.galeria-grid').forEach(galeria => {
    const fotos = Array.from(galeria.querySelectorAll('.galeria-foto'));
    if (fotos.length > 3) {
        fotos[2].classList.add('galeria-mais');
        fotos[2].dataset.extras = `+${fotos.length - 3}`;
    }
    fotos.forEach((botao, indice) => {
        botao.addEventListener('click', () => {
            fotosAtuais = fotos;
            botaoDeOrigem = botao;
            exibirFoto(indice);
            visualizador.showModal();
        });
    });
});

botaoAnterior.addEventListener('click', () => exibirFoto(indiceAtual - 1));
botaoProxima.addEventListener('click', () => exibirFoto(indiceAtual + 1));
botaoFechar.addEventListener('click', () => visualizador.close());
visualizador.addEventListener('click', evento => {
    if (evento.target === visualizador) visualizador.close();
});
visualizador.addEventListener('close', () => {
    imagemAmpliada.removeAttribute('src');
    botaoDeOrigem?.focus();
});
visualizador.addEventListener('keydown', evento => {
    if (evento.key === 'ArrowLeft') { evento.preventDefault(); exibirFoto(indiceAtual - 1); }
    if (evento.key === 'ArrowRight') { evento.preventDefault(); exibirFoto(indiceAtual + 1); }
});