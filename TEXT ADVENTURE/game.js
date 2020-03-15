const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'Your eyes slowly open as you regain consciousness. You find yourself in a strange room. There is a chest in the room. ',
    options: [
      {
        text: 'Open the chest',
        /*setState: { blueGoo: true },*/
        nextText: 2
      },
      {
        text: 'Ignore the chest',
        nextText: 3
      }
    ]
  },
  {
    id: 2,
    text: 'You open the chest and inside is a sword and a strange looking rock',
    options: [
      {
        text: 'Take the sword',
        setState: {sword: true },
        nextText: 3
      },
      {
        text: 'Take the strange rock',
        setState: { rock: true },
        nextText: 3
      },
    ]
  },
  {
    id: 3,
    text: '"I need to get out of here" you think to yourself. There are no doors and just one window. There are a few shelves around you with an array of books',
    options: [
      {
        text: 'Try the window',
        nextText: 4
      },
      {
        text: 'Explore the room and search for clues.',
        nextText: 5
      },
      {
        text: '"Maybe its all just a dream?" try to take a nap.',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'The window is bolted shut. You will need something large to break it',
    options: [
      {
        text: 'Explore the room and search for clues.',
        nextText: 5
      },
      {
        text: '"Maybe its all just a dream?" try to take a nap.',
        nextText: 6
      }
    ]
  },
  {
    id: 5,
    text: 'You explore the room, looking for any clues. This shelf looks suspicious.',
    options: [
      {
        text: 'Move the shelf',
        nextText: 7
      },
      {
        text: 'Investigate the contents of the shelf',
        nextText: 8
      }
    ]
  },
  {
    id: 6,
    text: 'This is not the time to take a nap!!',
    options: [
      {
        text: 'Explore the room and search for clues.',
        nextText: 5
      }
    ]
  },
  {
    id: 7,
    text: 'You move the shelf and find a trap door underneath it. It\'s locked',
    options: [
      {
        text: 'Investigate the contents of the shelf',
        nextText: 8
      }
    ]
  },
  {
    id: 8,
    text: 'You search for any clues on the shelf and you find a key.',
    options: [
      {
        text: 'Move the shelf.',
        nextText: 9
      }
    ]
  },
  {
    id: 9,
    text: 'You move the shelf and find a trap door underneath it. It\'s locked',
    options: [
      {
        text: 'Use the key.',
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: 'You open the trap door. You leave the room. Finally',
    options: [
      {
        text: 'Next Level',
        nextText: -1
      }
    ]
  },
]

startGame()