// Função que busca os dados
async function buscarDados() {
  const resposta = await fetch("https://rickandmortyapi.com/api/character");
  const dados = await resposta.json();
  return dados;
}


// Função que renderiza os dados
function adicionarDados(results) {
  const container = document.querySelector(".container");
  results.forEach((a) => {
    container.innerHTML += `
        <div class="card" id="card-${a.id}" data-id="${a.id}">
            <div class="images"><img src="${a.image}"/></div>
            <div class="card-body">
                <div class="duo">
                    <h4 class="card-title">${a.name}</h4>
                    <button class="card-button"id="card-button-${a.id}">abrir</button>
                </div>
            </div>
        </div>
    `;
  });
}

// Função que manipula os dados
function manipulaElementos(resultados) {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    const id = card.getAttribute("data-id");
    const data = resultados.find((result) => result.id === Number(id));

    const button = document.querySelector(`#card-button-${id}`);

    const modal = document.querySelector("dialog");

    const fechar = document.querySelector("#fechar");

    button.addEventListener("click", () => {
      const image = document.querySelector("#modal-image")
      const name = document.querySelector("#name")
      const status = document.querySelector("#status b")
      const species = document.querySelector("#species b")
      const gender = document.querySelector("#gender b")
      image.setAttribute ("src", data.image)
      name.innerHTML = data.name
      status.innerHTML = data.status
      species.innerHTML = data.species
      gender.innerHTML = data.gender
    modal.showModal();
    });

    fechar.addEventListener("click", () => {
      modal.close();
    });
  });
}

// função principal
async function main() {

  //chama Função que busca os dados
  let resultado = await buscarDados();

  //chama Função que renderiza os dados
  adicionarDados(resultado.results);

  //chama Função que maniipula os dados
  manipulaElementos(resultado.results);
}

// Filtrar personagens pelo campo de pesquisa
const filterElement = document.querySelector('#campo-pesquisa')
filterElement.addEventListener('input', filterCards)

function filterCards() {
  const cards = document.querySelectorAll('.card')

  for (let card of cards) {
    let title = card.querySelector('.card-title')
    title = title.textContent.toLowerCase()

    let filterText = filterElement.value.toLowerCase()

    if(!title.includes(filterText)) {
      card.style.display = 'none'
    }
    else {
      card.style.display = 'block'
    }
  }
}

main();










