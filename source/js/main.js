const btnMenuAmburguer = document.querySelector("#menu-amburguer");
const menuLateral = document.querySelector(".menu-lateral");
const menuVertical = document.querySelector(".menu-vertical");
const btnFecharMenu = document.querySelector(".btn-close");
const botoesInspecionar = document.querySelectorAll(".botao-inspecionar button");
const botaoFavoritoMenu = document.querySelector(".botao-favoritos");
const quantidadeProdutosFavoritos = localStorage.getItem("QuantidadeProdutos") || 0;
const botaoContadorfavoritos = document.querySelector(".quantidade-favoritos");
const botaoContadorCarrinho = document.querySelector(".quantidade-carrinho");
const botaoCarrinho = document.querySelector(".botao-carrinho");
const dadosProdutoCarrinho = JSON.parse(localStorage.getItem("produtoCarrinho")) || [];
const botaofavorito = null;

function atualizarQuantidadeProdutos(){
    const produtosExistentes = JSON.parse(localStorage.getItem("dados")) || [];
    const produtosExistentesCarrinho = JSON.parse(localStorage.getItem("produtoCarrinho")) || [];

    if(produtosExistentes.length > 0){
        botaoContadorfavoritos.style.display = "block";
    }else{
        botaoContadorfavoritos.style.display = "none";
    }
    if(produtosExistentesCarrinho.length > 0){
        botaoContadorCarrinho.style.display = "block";
    }else{
        botaoContadorCarrinho.style.display = "none";
    }
}
atualizarQuantidadeProdutos()

btnMenuAmburguer.addEventListener("click",function(){
    menuLateral.style.display = "block";
    document.body.style.overflow = 'hidden';
    setTimeout(function(){
        menuLateral.classList.add("menu-ativo");
    },100)
    
})
botaoFavoritoMenu.addEventListener("click",function(){
    window.location.href = "favoritos.html";
})
botaoCarrinho.addEventListener("click",function(){
    window.location.href = "carrinho.html";
})
btnFecharMenu.addEventListener("click",function(){
    menuLateral.classList.remove("menu-ativo");
    document.body.style.overflow = 'auto'; 
})

botoesInspecionar.forEach(botao =>{
    botao.addEventListener("click",function(){
        const colunaProduto = botao.closest(".produto");

        const detalhesElement = colunaProduto.querySelector(".detalhes-produto");
        const dados = {
            nomeProduto : colunaProduto.querySelector("h6.text-center").innerText,
            valor : colunaProduto.querySelector("strong p.text-center").innerText,
            img: colunaProduto.querySelector("img").src,
            detalhes: detalhesElement ? detalhesElement.innerHTML : "",
        }

        const corpoMenuVertical = menuVertical.querySelector('.menu-vertical-corpo');
        const sliderFor = menuVertical.querySelector('.slider-for');
        const sliderNav = menuVertical.querySelector('.slider-nav');

        if ($(sliderFor).hasClass('slick-initialized')) {
            $(sliderFor).slick('unslick');
        }
        if ($(sliderNav).hasClass('slick-initialized')) {
            $(sliderNav).slick('unslick');
        }

        let slidesHtml = `<div><img src="${dados.img}"></div>`;
        let navHtml = `<div><img src="${dados.img}"></div>`;

        const fotosGaleria = colunaProduto.querySelectorAll(".fotos-galeria img");

        if (fotosGaleria.length > 0) {
            fotosGaleria.forEach(img => {
                slidesHtml += `<div><img src="${img.src}"></div>`;
                navHtml += `<div><img src="${img.src}"></div>`;
            });
        }
        
        sliderFor.innerHTML = slidesHtml;
        sliderNav.innerHTML = navHtml;

        corpoMenuVertical.innerHTML = `<div class="container">
            <h3 class="mb-3 mt-3 nome-produto">${dados.nomeProduto}</h3>
            <h4 class="text-center mb-3 valor-produto">${dados.valor}</h4>
            <button class="btn btn-dark botao-adicionar-carrinho">+ Adicionar ao carrinho</button>
            <div class="container-favoritos-e-detalhes d-flex d-flex justify-content-between">
                <div class="botao-adicionar-favoritos d-flex justify-content-center align-items-center gap-2">
                    <i class="fa-regular fa-heart"></i>
                    <p class="mb-0">Adicionar ao favoritos</p>
                </div>
                <div class="botao-adicionar-favoritos d-flex justify-content-center align-items-center gap-2">
                    <i class="fas fa-info-circle"></i>
                    <p class="mb-0">Detalhes</p>
                </div>
            </div>
            ${dados.detalhes ? `<div class="detalhes mt-4">
                <h1 class="text-center mb-4">Detalhes do produto</h1>
                ${dados.detalhes}
            </div>` : ''}
        </div>`;

        menuVertical.style.display = "block";
        document.body.style.overflow = 'hidden';

        $('.slider-for').slick({ slidesToShow: 1, slidesToScroll: 1, arrows: false, fade: true, asNavFor: '.slider-nav' });
        $('.slider-nav').slick({ slidesToShow: 3, slidesToScroll: 1, asNavFor: '.slider-for', dots: true, centerMode: true, focusOnSelect: true });

        setTimeout(function(){
            menuVertical.classList.add("menu-vertical-ativo");
        },100)
    })
})

menuVertical.addEventListener("click", function(e) {
    if (e.target.classList.contains("botao-voltar")) {

        menuVertical.classList.remove("menu-vertical-ativo");
        document.body.style.overflow = 'auto';
        setTimeout(function(){
            menuVertical.style.display = "none";
            document.querySelector(".faixa-alerta").style.top = "60px"
        }, 500)
    }
});
menuVertical.addEventListener("click", function(event) {
    const btnFavorito = event.target.closest(".botao-adicionar-favoritos");

    // 1. Verificamos se clicamos no botão de coração (evita bugar com o botão de detalhes)
   // ... dentro do menuVertical.addEventListener("click" ...
if (btnFavorito && btnFavorito.querySelector(".fa-heart")) {
    const icone = btnFavorito.querySelector("i");
    const texto = btnFavorito.querySelector("p");

    icone.classList.toggle("fa-solid");
    icone.classList.toggle("fa-regular");

    // Pegamos o nome EXATO do produto que está aberto no menu
    const nomeAtual = menuVertical.querySelector(".nome-produto").innerText.trim();
    
    let listaFavoritos = JSON.parse(localStorage.getItem("dados")) || [];

    if (icone.classList.contains("fa-solid")) {
        // ADICIONAR
        icone.style.color = "red";
        texto.innerText = "Remover dos favoritos";;
        
        const novoProduto = {
            img: menuVertical.querySelector(".slider-for .slick-current img").src,
            nome: nomeAtual,
            valor: menuVertical.querySelector(".valor-produto").innerText
        };
        
        // Evita duplicar se o cara clicar mil vezes
        const jaExiste = listaFavoritos.some(p => p.nome === nomeAtual);
        if(!jaExiste) {
            listaFavoritos.push(novoProduto);
        }
    } else {
        // REMOVER (Onde estava o problema)
        icone.style.color = "";
        texto.innerText = "Adicionar aos favoritos";
        
        // Filtra a lista: mantém tudo que NÃO for o nome atual
        listaFavoritos = listaFavoritos.filter(p => p.nome.trim() !== nomeAtual);
    }

    // SALVA A LISTA LIMPA
    localStorage.setItem("dados", JSON.stringify(listaFavoritos));
    
    // ATUALIZA A BOLINHA NO TOPO NA HORA
    atualizarQuantidadeProdutos();
}
});
menuVertical.addEventListener("click", function(event) {
    const btnAdicionarCarrinho = event.target.closest(".botao-adicionar-carrinho");
    const popupAdicaoCarrinho = document.querySelector(".popup-adicao-carrinho");

    if (btnAdicionarCarrinho) {

        const produtoCarrinho = {
            img: menuVertical.querySelector(".slider-for .slick-current img").src,
            nome: menuVertical.querySelector(".nome-produto").innerText,
            valor: menuVertical.querySelector(".valor-produto").innerText
        };
        dadosProdutoCarrinho.push(produtoCarrinho);
        localStorage.setItem("produtoCarrinho", JSON.stringify(dadosProdutoCarrinho));
        atualizarQuantidadeProdutos()
        popupAdicaoCarrinho.style.display = "block";
        setTimeout(function(){
        popupAdicaoCarrinho.style.transform = "translateY(0)";
            setTimeout(function(){
                popupAdicaoCarrinho.style.transform = "translateY(100%)";
                    setTimeout(function(){
                        popupAdicaoCarrinho.style.display = "none";
                    },500)
            },1000)
        },300)
        
    };
})

$(document).ready(function(){
    $('#carouselprodutos').slick({
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite: false, 
        arrows: false,
        dots: true,
    });
    $('#carouselProdutosLancamentos').slick({
        slidesToShow: 2.5,
        slidesToScroll: 1,
        infinite: false, 
        arrows: false,
        dots: true,
    });
    $('.popup-link').magnificPopup({
        type: 'image',
        mainClass: 'mfp-with-zoom',
        zoom: {
            enabled: true,
            duration: 300
        },
        image: {
            verticalFit: true,
            titleSrc: function(item) {
                return 'Echo Moda - Coleção Exclusiva';
            }
        }
    });
});