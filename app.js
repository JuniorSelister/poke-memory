let pokemon = [
  {
    id: 0,
    name: "Bulbasaur",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
  },
  {
    id: 1,
    name: "Ivysaur",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/2.svg"
  },
  {
    id: 2,
    name: "Venusaur",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/3.svg"
  },
  {
    id: 3,
    name: "Charmander",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg"
  },
  {
    id: 4,
    name: "Charmeleon",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/5.svg"
  },
  {
    id: 5,
    name: "Charizard",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/6.svg"
  },
  {
    id: 6,
    name: "Squirtle",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg"
  },
  {
    id: 7,
    name: "Wartotle",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/8.svg"
  },
  {
    id: 8,
    name: "Blastoise",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/9.svg"
  },
  {
    id: 9,
    name: "Caterpie",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/10.svg"
  },
  {
    id: 10,
    name: "Metapod",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/11.svg"
  },
  {
    id: 11,
    name: "Butterfree",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/12.svg"
  },
  {
    id: 12,
    name: "Weedle",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/13.svg"
  },
  {
    id: 13,
    name: "Kakuna",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/14.svg"
  },
  {
    id: 14,
    name: "Beedril",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/15.svg"
  },
  {
    id: 15,
    name: "Pidgey",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/16.svg"
  },
  {
    id: 16,
    name: "Pidgeotto",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/17.svg"
  },
  {
    id: 17,
    name: "Pidgeot",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/18.svg"
  },
  {
    id: 18,
    name: "Rattata",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/19.svg"
  },
  {
    id: 19,
    name: "Radicate",
    img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/20.svg"
  }
]

const selectors = {
  boardContainer: document.querySelector('.board-container'),
  board: document.querySelector('.board'),
  moves: document.querySelector('.moves'),
  timer: document.querySelector('.timer'),
  start: document.querySelector('button'),
  win: document.querySelector('.win')
}

const state = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null
}

const shuffle = array => {
  const clonedArray = [...array]

  for (let index = clonedArray.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const original = clonedArray[index]

    clonedArray[index] = clonedArray[randomIndex]
    clonedArray[randomIndex] = original
  }

  return clonedArray
}

const pickRandom = (array, items) => {
  const clonedArray = [...array]
  const randomPicks = []

  for (let index = 0; index < items; index++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length)
    
    randomPicks.push(clonedArray[randomIndex])
    clonedArray.splice(randomIndex, 1)
  }

  return randomPicks
}

const generateGame = () => {
  const dimensions = selectors.board.getAttribute('data-dimension')

  if (dimensions % 2 !== 0) {
    throw new Error("The dimension of the board must be an even number.")
  }

  const pokemonList = pokemon.map((catchPokemon) => {
    return `<p>${catchPokemon.id}</p><img src=${catchPokemon.img} id="${catchPokemon.id}" />`;
  })
  const picks = pickRandom(pokemonList, (dimensions * dimensions) / 2) 
  const items = shuffle([...picks, ...picks])
  const cards = `
    <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
      ${items.map(item => `
        <div class="card">
          <div class="card-front"></div>
          <div class="card-back">${item}</div>
        </div>
      `).join('')}
    </div>
  `
  
  const parser = new DOMParser().parseFromString(cards, 'text/html')

  selectors.board.replaceWith(parser.querySelector('.board'))
}

const startGame = () => {
  state.gameStarted = true
  selectors.start.classList.add('disabled')

  console.log(pokemon.id)

  state.loop = setInterval(() => {
    state.totalTime++

    selectors.moves.innerText = `${state.totalFlips} moves`
    selectors.timer.innerText = `time: ${state.totalTime} sec`
  }, 1000)
}

const flipBackCards = () => {
  document.querySelectorAll('.card:not(.matched)').forEach(card => {
    card.classList.remove('flipped')
  })

  state.flippedCards = 0
}

const flipCard = card => {
  state.flippedCards++
  state.totalFlips++

  if (!state.gameStarted) {
    startGame()
  }

  if (state.flippedCards <= 2) {
    card.classList.add('flipped')
  }

  if (state.flippedCards === 2) {
    const flippedCards = document.querySelectorAll('.flipped:not(.matched)')

    if (flippedCards[0].innerText === flippedCards[1].innerText) {
      flippedCards[0].classList.add('matched')
      flippedCards[1].classList.add('matched')
    }

    setTimeout(() => {
        flipBackCards()
    }, 1000)
  }

  if (!document.querySelectorAll('.card:not(.flipped)').length) {
    setTimeout(() => {
      selectors.boardContainer.classList.add('flipped')
      selectors.win.innerHTML = `
        <span class="win-text">
          You won!<br />
          with <span class="highlight">${state.totalFlips}</span> moves<br />
          under <span class="highlight">${state.totalTime}</span> seconds
        </span>
      `

      clearInterval(state.loop)
    }, 1000)
  }
}

const attachEventListeners = () => {
  document.addEventListener('click', event => {
    const eventTarget = event.target
    const eventParent = eventTarget.parentElement

    if (eventTarget.className.includes('card') && !eventParent.className.includes('flipped')) {
      flipCard(eventParent)
    } else if (eventTarget.nodeName === 'BUTTON' && !eventTarget.className.includes('disabled')) {
      startGame()
    }
  })
}

generateGame()
attachEventListeners()