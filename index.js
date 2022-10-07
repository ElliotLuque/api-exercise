const BASE_URL = "https://pokeapi.co/api/v2"

document.addEventListener("DOMContentLoaded", () => {
    getPokemonList(151)
})

// Filter pokemons by name
document.getElementById("search").addEventListener("keyup", filterList)
function filterList () {
    const input = document.getElementById("search")
    const filter = input.value.toUpperCase()
    const cards = document.getElementsByClassName("card")

    Array.from(cards).forEach(card => {
        const pokemonName = card.getElementsByClassName("card-title")[0]

        pokemonName.innerText.toUpperCase().indexOf(filter) > -1 
        ? card.style.display = "" 
        : card.style.display = "none"
    })
}

// Get number of pokemons
async function getPokemonList(limit) {
    const resp = await fetch(`${BASE_URL}/pokemon?limit=${limit}`)
    const data = await resp.json()

    for (let pokemon of data.results) {
        await getPokemonData(pokemon)
    }
}

// Get all data from a single pokemon
async function getPokemonData(pokemon) {
    const resp = await fetch(pokemon.url)
    const data = await resp.json()

    // Card data
    const name = data.name.charAt(0).toUpperCase() + data.name.slice(1) // Uppercase first letter
    const image = data.sprites.front_default
    const stats = data.stats
    const id = data.id

    const card = createPokemonCard(name, image, stats, id)
    document.getElementById("content").appendChild(card)
}

createPokemonCard = (name, image, stats, id) => {
    
    // ID naming
    if (id < 10) {
        id = `#00${id}`
    } else if (id < 100) {
        id = `#0${id}`
    } else {
        id = `#${id}`
    }

    const card = document.createElement("div")
    card.className = "card m-3"
    card.style = "width: 25rem;"

    const cardImage = document.createElement("img")
    cardImage.width = 200
    cardImage.src = image
    cardImage.className = "card-img-top"
    
    const cardTitle = document.createElement("h2")
    cardTitle.className = "card-title mb-4"
    cardTitle.innerText = name

    const cardBody = document.createElement("div")
    cardBody.className = "card-body"

    const cardFooter = document.createElement("div")
    cardFooter.className = "card-footer fw-bold fs-5"
    cardFooter.innerHTML = id

    const cardStats = document.createElement("div")
    cardStats.className = "container"

    stats.forEach(stat => {
        const statRow = document.createElement("div")
        statRow.className = "d-flex justify-content-between"

        const statName = stat.stat.name
        const statValue = stat.base_stat        

        const statElement = document.createElement("p")
        statElement.className = "text-muted"
        statElement.innerText = statName.toUpperCase()

        const statValueElement = document.createElement("p")
        statValueElement.className = "fw-bold"
        statValueElement.innerText = statValue

        statRow.append(statElement)
        statRow.append(statValueElement)

        cardStats.append(statRow)
    })
    
    // Card
    cardBody.append(cardTitle)
    cardBody.append(cardStats)

    // Card
    card.append(cardImage)
    card.append(cardBody)
    card.append(cardFooter)

    return card
}