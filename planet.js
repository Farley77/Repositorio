let currentPageUrl = 'https://swapi.dev/api/planets/';

window.onload = async () => {
    try {
        await loadPlanets(currentPageUrl);
    } catch {
        alert('Erro ao carregar planetas');
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
    
}


async function loadPlanets(url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; 

    try {

        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach( async (planet) => {
            const cards = document.createElement("div");
            let urlImg = `https://starwars-visualguide.com/assets/img/planets/${planet.url.replace(/\D/g, "")}.jpg`;
            const response = await fetch(urlImg);
            if (response.status =='404') {
                urlImg = 'https://starwars-francofg-dev.netlify.app/assets/No-Image-Placeholder.svg.png';
            }
            cards.className = "cards";
            cards.style.backgroundImage = `url('${urlImg}')`;


            const characterNameBg = document.createElement("div");
            characterNameBg.className = "character-name-bg";

            const characterName = document.createElement("spam");
            characterName.className = "character-name";
            characterName.innerText = `${planet.name}`;

            mainContent.appendChild(cards);
            cards.appendChild(characterNameBg)
            characterNameBg.appendChild(characterName);

            cards.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";

                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = '';

                const modalImg = document.createElement('div');
                modalImg.style.backgroundImage = `url('${urlImg}')`;
                modalImg.className = "planet-image";
                
                const namePlanet = document.createElement("span")
                namePlanet.className = "planet-details";
                namePlanet.innerText = `Nome: ${planet.name}`;
                
                const climate = document.createElement("span")
                climate.className = "planet-details";
                climate.innerText = `Clima: ${convertClimate(planet.climate)}`;

                const orbitalPeriod = document.createElement("span")
                orbitalPeriod.className = "planet-details";
                orbitalPeriod.innerText = `orbita: ${convertOrbital(planet.orbital_period)} dias`;

                const population = document.createElement("span")
                population.className = "planet-details";
                population.innerText = `Populacao: ${convertPopulation(planet.population)}`;

                const rotationPeriod = document.createElement("span")
                rotationPeriod.className = "planet-details";
                rotationPeriod.innerText = `Rotacao: ${planet.rotation_period} hrs` ;

                
                const diameter = document.createElement("span")
                diameter.className = "planet-details";
                diameter.innerText = `Diametro: ${convertDiameter(planet.diameter)} km`;
                
                
                const gravity = document.createElement("span")
                gravity.className = "planet-details";
                gravity.innerText = `Gravidade: ${planet.gravity}`;

            
                modalContent.appendChild(modalImg)
                modalContent.appendChild(namePlanet);
                modalContent.appendChild(climate);
                modalContent.appendChild(population);
                modalContent.appendChild(diameter);
                modalContent.appendChild(rotationPeriod);
                modalContent.appendChild(orbitalPeriod);
        }

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


function convertPopulation(populacao) {
if(populacao=="unknown") return "Desconhecido"

    // Converte a população para uma string formatada
    const formattedPopulation = (populacao / 1).toLocaleString('pt-BR', {
        maximumFractionDigits: 3
    });
    return formattedPopulation;
}

function convertDiameter(diametro) {
    // Converte a população para uma string formatada
    const formattedPopulation = (diametro / 1).toLocaleString('pt-BR', {
        maximumFractionDigits: 3
    });
    return formattedPopulation;
}

function convertOrbital(orbita) {
    // Converte a população para uma string formatada
    const formattedPopulation = (orbita / 1).toLocaleString('pt-BR', {
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
        await loadPlanets(responseJson.next)

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

        await loadPlanets(responseJson.previous)
        
    } catch (error) {
        console.log(error)
        alert('erro ao carregar a página anterior')
    }
}





