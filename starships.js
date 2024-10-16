let currentPageUrl = 'https://swapi.dev/api/starships/';

window.onload = async () => {
    try {
        await loadStarships(currentPageUrl);
    } catch {
        alert('Erro ao carregar naves');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
    
}


async function loadStarships(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; 

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach( async (starships) => {
            const cards = document.createElement("div");
            let urlImg = `https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg`;
            const response = await fetch(urlImg);
            if (response.status =='404') {
                urlImg = 'https://starwars-francofg-dev.netlify.app/assets/No-Image-Placeholder.svg.png';
            }
            cards.className = "cards";
            cards.style.backgroundImage = `url('${urlImg}')`;

            const starshipsNameBg = document.createElement("div");
            starshipsNameBg.className = "starships-name-bg";

            const starshipsName = document.createElement("spam");
            starshipsName.className = "starships-name";
            starshipsName.innerText = `${starships.name}`;

            mainContent.appendChild(cards);
            cards.appendChild(starshipsNameBg)
            starshipsNameBg.appendChild(starshipsName);

            cards.onclick = () => {
                const modal = document.getElementById("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById("modal-content")
                modalContent.innerHTML = ''

                const characterImage = document.createElement("div")
                characterImage.style.backgroundImage = `url('${urlImg}')`;
                characterImage.className = "starships-image"

                const name = document.createElement("span")
                name.className = "starships-details"
                name.innerText = `Nome: ${starships.name}`

                const speed = document.createElement("span")
                speed.className = "starships-details"
                speed.innerText = `velocidade: ${starships.max_atmosphering_speed} km/h `

                const passengers = document.createElement("span")
                passengers.className = "starships-details"
                passengers.innerText = `Passageiros: ${convertPassageiro(starships.passengers)} `

                const length = document.createElement("span")
                length.className = "starships-details"
                length.innerText = `comprimento: ${starships.length}m`         

                const cargocapacity = document.createElement("span")
                cargocapacity.className = "starships-details"
                cargocapacity.innerText = `Capacidade de carga: ${convertCarga(starships.cargo_capacity)}t}`

                const crewCapacity = document.createElement("span")
                crewCapacity.className = "starships-details"
                crewCapacity.innerText = `Capacidade de carga: ${starships.crew}`
                
                modalContent.appendChild(characterImage)
                modalContent.appendChild(name)
                modalContent.appendChild(speed)
                modalContent.appendChild(passengers)
                modalContent.appendChild(length)
                modalContent.appendChild(crewCapacity)
            }
            
            mainContent.appendChild(cards)

       });
       currentPageUrl = url

       const nextButton = document.getElementById("next-button")
       const backButton = document.getElementById("back-button")

       nextButton.disabled = !responseJson.next
       backButton.disabled = !responseJson.previous

       backButton.style.visibility = responseJson.previous? "visible" : "hidden"
       
    

}catch{
    alert('Erro ao carregar planetas');
}
}

function convertPassageiro(passageiros){
    if(passageiros == "n/a" || passageiros == "unknown"){
        return "Desconhecido"
    } else if(passageiros == "843,342"){
        return "843.342 milhões"
    } 
    
    const formattedPopulation = (passageiros / 1).toLocaleString('pt-BR', {
        minFractionDigits: 3,
        maximumFractionDigits: 3
    });
    return formattedPopulation;
}


function convertPopulation(populacao) {
if(populacao=="unknown") return "Desconhecido"

    // Converte a população para uma string formatada
    const formattedPopulation = (populacao / 1).toLocaleString('pt-BR', {
        maximumFractionDigits: 3
    });
    return formattedPopulation;
}

function convertCarga(carga) {
    const formattedPopulation = (carga / 1000).toLocaleString('pt-BR', {
        maximumFractionDigits: 3
    });
    return formattedPopulation;
}


//Traduz o nome dos climas para português
function convertClimate(climate) {
    const clima = {
        arid: "Arido",
        temperate: "Termperado",
        tropical: "Tropical",
        frozen: "Congelado",
        murky: "Escuro",
        hot: "Quente",
        frigid: "Gelado",
        windy:"Ventoso",
        'artificial temperate':"Temperado artificial",
        moist: 'Umido',
        humid: 'Umido',
        unknown: "Desconhecido"

    };

    return climate
    .split(',')
    .map(c => clima[c.trim().toLowerCase()] || c.trim())
    .join(', ');
}

function hideModal(){
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}


async function loadNextPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()
        await loadStarships(responseJson.next)

    } catch (error) {
        console.log(error)
        alert('erro ao carregar próxima página')
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadStarships(responseJson.previous)
        
    } catch (error) {
        console.log(error)
        alert('erro ao carregar a página anterior')
    }
}





