const botaoVoltarFavorito = document.querySelector(".botao-voltar-favorito");
const produtosCarrinho = JSON.parse(localStorage.getItem("produtoCarrinho")) || [];
const corpoCardCarrinho = document.querySelector(".container .row");


if (produtosCarrinho.length === 0) {
    // Definimos a variável e já jogamos no HTML
    const msgVazia = "<p class='text-center mt-3' style='text-transform:uppercase'>Você ainda não tem produtos no carrinho</p>";
    corpoCardCarrinho.innerHTML = msgVazia;
} else {
    // 2. SÓ RODA O LOOP SE TIVER ITENS:
    produtosCarrinho.forEach(produto => {
        corpoCardCarrinho.innerHTML += criarCardProdutoCarrinho(produto);
    });
}

function criarCardProdutoCarrinho(produtosCarrinho){
    const cardHtml =`<div class="col-6 col-md-4 col-lg-3 mb-4">
                        <div class="produto-favorito">
                            <img src="${produtosCarrinho.img}" class="w-100" alt="Bolsa de couro">
                            <h6 class="text-center mt-2">${produtosCarrinho.nome}</h6>
                            <strong><p class="text-center">${produtosCarrinho.valor}</p></strong>
                            <button class="btn btn-dark btn-sm w-100">Ver produto</button>
                            <button class="btn btn-outline-danger btn-sm w-100 mt-2" id="botao-remover">Remover</button>
                        </div>
                    </div>`
    return cardHtml;
}
botaoVoltarFavorito.addEventListener("click",function(){
    window.location.href = "index.html";
})

function atualizarQuantidadeProdutos(){
    const produtosExistentesCarrinho = produtosCarrinho.length;
    localStorage.setItem("quantidadeProdutosCarrinho",produtosExistentesCarrinho);
}
if(produtosCarrinho.length > 0){
    const botaoRemover = document.querySelectorAll("#botao-remover");

botaoRemover.forEach(botao => {
botao.addEventListener("click",function(event){
    const cardClicado = event.target.closest(".col-6");
    const nomeProduto = cardClicado.querySelector("h6").innerText;
    const indiceProduto = produtosCarrinho.findIndex(produto => produto.nome === nomeProduto);
    
    if (indiceProduto !== -1) {
        produtosCarrinho.splice(indiceProduto, 1);
        localStorage.setItem("produtoCarrinho", JSON.stringify(produtosCarrinho));
        cardClicado.remove();
        atualizarQuantidadeProdutos();
    }
    });
});
}
atualizarQuantidadeProdutos()
