const listaFavoritos = JSON.parse(localStorage.getItem("dados")) || [];
const botaoVoltarFavorito = document.querySelector(".botao-voltar-favorito");
const corpoCard = document.querySelector(".container .row"); 



botaoVoltarFavorito.addEventListener("click",function(){
    window.location.href = "index.html";
})

// 1. CORREÇÃO DA MENSAGEM:
if (listaFavoritos.length === 0) {
    // Definimos a variável e já jogamos no HTML
    const msgVazia = "<p class='text-center mt-3' style='text-transform:uppercase'>Você ainda não tem favoritos</p>";
    corpoCard.innerHTML = msgVazia;
} else {
    // 2. SÓ RODA O LOOP SE TIVER ITENS:
    listaFavoritos.forEach(produto => {
        corpoCard.innerHTML += criarCardProduto(produto);
    });
}

function criarCardProduto(listaFavoritos){
    const cardHtml =`<div class="col-6 col-md-4 col-lg-3 mb-4">
                        <div class="produto-favorito">
                            <img src="${listaFavoritos.img}" class="w-100" alt="Bolsa de couro">
                            <h6 class="text-center mt-2">${listaFavoritos.nome}</h6>
                            <strong><p class="text-center">${listaFavoritos.valor}</p></strong>
                            <button class="btn btn-dark btn-sm w-100">Ver produto</button>
                            <button class="btn btn-outline-danger btn-sm w-100 mt-2 botao-remover">Remover</button>
                        </div>
                    </div>`
    return cardHtml;
}
function atualizarQuantidadeProdutos(){
        const produtosExistentes = listaFavoritos.length;
        localStorage.setItem("quantidadeProdutos",produtosExistentes);
}

if(listaFavoritos.length > 0){
    const botaoRemover = document.querySelectorAll(".botao-remover");

botaoRemover.forEach(botao => {
botao.addEventListener("click",function(event){
    const cardClicado = event.target.closest(".col-6");
    const nomeProduto = cardClicado.querySelector("h6").innerText;
    const indiceProduto = listaFavoritos.findIndex(produto => produto.nome === nomeProduto);
    
    if (indiceProduto !== -1) {
        listaFavoritos.splice(indiceProduto, 1);
        localStorage.setItem("dados", JSON.stringify(listaFavoritos));
        cardClicado.remove();
        atualizarQuantidadeProdutos();
    }

    });
});
}
atualizarQuantidadeProdutos()
