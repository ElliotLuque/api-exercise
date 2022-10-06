const BASE_URL = "https://pokeapi.co/api/v2"

getPokemons(151)

async function getPokemons(limit) {
    const response = await fetch(BASE_URL + `/pokemon?limit=${limit}`).catch(err => alert(err))
    const data = await response.json()

    const pokemonArray = data.results

    pokemonArray.forEach(pokemon => {   
        fetch(BASE_URL + `/pokemon/${pokemon.name}`)
        .then(response => response.json())
        .then(pkmData => {
            const name = pkmData.name
            const image = pkmData.sprites.front_default
            const stats = pkmData.stats

            document.getElementById("content").append(createPokemonCard(name, image, stats))
        })
    })
}

createPokemonCard = (name, image, stats) => {
    const card = document.createElement("div")
    card.className = "card m-4 col-3"

    const cardImage = document.createElement("img")
    cardImage.className = "card-image"
    cardImage.width = 200
    cardImage.src = image

    const cardTitle = document.createElement("h2")
    cardTitle.className = "card-title"
    cardTitle.innerText = name

    const cardStats = document.createElement("div")
    cardStats.className = "card-stats"

    stats.forEach(stat => {
        const statName = stat.stat.name
        const statValue = stat.base_stat

        const statContainer = document.createElement("div")
        statContainer.className = "stat-container"

        const statNameElement = document.createElement("p")
        statNameElement.className = "stat-name"
        statNameElement.innerText = statName.toUpperCase()

        const statValueElement = document.createElement("p")
        statValueElement.className = "stat-value"
        statValueElement.innerText = statValue

        statContainer.append(statNameElement)
        statContainer.append(statValueElement)

        cardStats.append(statContainer)
    })

    card.append(cardImage)
    card.append(cardTitle)
    card.append(cardStats)

    return card
}