window.onload = () =>{
    "use strict";
    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("./sw.js");
    }
}

let pontos= [];
let cat = "Olivia";
const jogador = document.getElementById("jogador");

const imagem = (elemento) => {
  if (cat === "Olivia") {
    elemento.target.style.backgroundImage = "url('https://i.pinimg.com/236x/5b/ec/85/5bec852724aa9e4537cce8a0f114de67.jpg')";
  } else {
    elemento.target.style.backgroundImage = "url('https://i.pinimg.com/236x/ca/fb/46/cafb46a13484751022e18040560e1684.jpg')";
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

function renatao() {
  jogador.innerHTML = `Jogada: ${cat}`;

  document.querySelectorAll(".maluquice button").forEach((item) => {
    item.style.backgroundImage = "";
    item.addEventListener("click", marcaRenatao);
  });
}

renatao();

function marcaRenatao(e) {
  const index = e.target.getAttribute("id");
  imagem(e)
  e.target.removeEventListener("click", marcaRenatao);
  pontos[index] = cat;

  cat = cat === "Olivia" ? "Meredith" : "Olivia";
  marcador.innerHTML = `JOGADOR DA VEZ: ${cat}`;

  verificaRenatao()
}

function verificaRenatao() {
  let historicoPontos = cat === "Olivia" ? "Meredith" : "Olivia";

  const items = pontos
    .map((item, i) => [item, i])
    .filter((item) => item[0] === catLastMove)
    .map((item) => item[1]);

  for (pos of vitorias) {
    if (pos.every((item) => items.includes(item))) {
      alert("O JOGADOR '" + catLastMove + "' GANHOU!");
      return;
    }
  }

  if (pontos.filter((item) => item).length === 9) {
    alert("DEU EMPATE!");
    return;
  }
}