window.onload = () =>{
    "use strict";
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
}

let pontos;
let pontuacao1 = 0
let pontuacao2 = 0
const jogador1 = document.querySelector("#jogador1")
const jogador2 = document.querySelector("#jogador2")

const pontos1 = document.getElementById("pontos1")
const pontos2 = document.getElementById("pontos2")

let cat = "Olivia";

const jogador = document.getElementById("jogador");

const imagem = (elemento) => {
  if (cat === "Olivia") {
    elemento.target.style.backgroundImage = "url('./imagens/olivia.jpg')";
  } else {
    elemento.target.style.backgroundImage = "url('./imagens/meredith.jpg')";
  }
};

let vitorias = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

function atualizarPontuacao() {
  pontos1.textContent = pontuacao1;
  pontos2.textContent = pontuacao2;
  }

function renatao() {
  pontos = [];

  document.getElementById("jogadores").innerHTML = document.getElementById("jogador1").value + " X " + document.getElementById("jogador2").value
  document.getElementById("pontos1").innerHTML = pontuacao1;
  document.getElementById("pontos2").innerHTML = pontuacao2;
  jogador.innerHTML = `Jogada: ${cat}`;

  document.querySelectorAll(".maluquice button").forEach((item) => {
    item.style.backgroundImage = "";
    item.addEventListener("click", marcaRenatao);

  });
}

//renatao();

function marcaRenatao(e) {
  const index = e.target.getAttribute("id");
  imagem(e)
  e.target.removeEventListener("click", marcaRenatao);
  pontos[index] = cat;

  setTimeout(() => {
    verificaRenatao();
  }, [100]);

  cat = cat === "Olivia" ? "Meredith" : "Olivia";
  jogador.innerHTML = `Jogada: ${cat}`;

}

function verificaRenatao() {
  let historicoPontos = cat === "Olivia" ? "Meredith" : "Olivia";

  const items = pontos
    .map((item, i) => [item, i])
    .filter((item) => item[0] === historicoPontos)
    .map((item) => item[1]);

  for (pos of vitorias) {
    if (pos.every((item) => items.includes(item))) {
      alert(historicoPontos + " Venceu!");
      if(historicoPontos=== "Olivia"){
        pontuacao1++
        atualizarPontuacao()
      }else{
        pontuacao2++
        atualizarPontuacao()
      }
      renatao()
      return;
    }
  }

  if (pontos.filter((item) => item).length === 9) {
    alert("Velha!");
    renatao()
    return;
  }
}

function reiniciar() {
  pontos = [];
  document.querySelectorAll(".maluquice button").forEach((item) => {
    item.style.backgroundImage = "";
    item.removeEventListener("click", marcaRenatao);

  });

  jogador1.value = ''
  jogador2.value = ''
  document.getElementById("jogadores").innerHTML = ''
  document.getElementById("pontos1").innerHTML = ''
  document.getElementById("pontos2").innerHTML = ''
  jogador.innerHTML = ''
  pontuacao1 = 0
  pontuacao2 = 0  
  atualizarPontuacao()
}