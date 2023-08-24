
const inputTags: NodeList = document.querySelectorAll('input');
const inputArray: HTMLElement[] = [...inputTags];

const startBtn = document.querySelector('.start') as HTMLButtonElement;
const resetBtn = document.querySelector('.reset') as HTMLButtonElement;

const playerStatusTag = document.querySelector('.playerStatus') as HTMLParagraphElement;
const winnerStatusTag = document.querySelector('.winnerStatus') as HTMLParagraphElement;

let isStarting = false;
let eventCount: number = 0;
const updateStartAndResetBtn = () => {
    if(isStarting) {
        startBtn.style.display = 'none';
        resetBtn.style.display = 'block';
    }else {
        startBtn.style.display = 'block';
        resetBtn.style.display = 'none';
    }
}

const startGame = () => {
    inputArray.forEach(item => {
        item.removeEventListener('focus', inputFocus)  // Remove existing listener, if any
        item.addEventListener('focus', inputFocus)  // Add a new listener
    });
}

const inputFocus = (e: Event) => {
    eventCount++;
    console.log(eventCount);
    if(eventCount%2 !== 0) {
        e.target.value = 'X';
        e.target.classList.remove('coloredValue');
        playerStatusTag.innerText = "Player O's turn";
    }else {
        e.target.value = 'O';
        e.target.classList.add('coloredValue');
        playerStatusTag.innerText = "Player X's turn";
    }

    e.target.disabled = true;

    updateWinnerStatus();
}

const updateWinnerStatus = () => {
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
        [0, 3, 6], [1, 4, 7], [2, 5 ,8],  // columns
        [0, 4, 8], [6, 4, 2]  // diagonals
    ]

    for(let i = 0; i < winningConditions.length; i++) {
        const a: number = winningConditions[i][0];
        const b: number = winningConditions[i][1];
        const c: number = winningConditions[i][2];

        const cellA: string = inputArray[a].value;
        const cellB: string = inputArray[b].value;
        const cellC: string = inputArray[c].value;

        if(cellA === cellB && cellB === cellC && cellA !== "") {
            winnerStatusTag.innerText = `Player ${cellA} is the winner!`;
            disableAll();
            playerStatusTag.innerText = "";
            return;
        }

        const allCellsAreFilled: boolean = inputArray.every(element => element.value !== "");
        if(allCellsAreFilled) {
            winnerStatusTag.innerText = "No winner!";
            disableAll();
            playerStatusTag.innerText = "";
        }else {
            winnerStatusTag.innerText = "";
        }
    }
}

// const updateTheWinnerStatus = () => {
//     const winConditions = [
//         [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
//         [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
//         [0, 4, 8], [2, 4, 6] // Diagonals
//     ];

//     for (let i = 0; i < winConditions.length; i++) {
//         const condition = winConditions[i];
//         const a = condition[0];
//         const b = condition[1];
//         const c = condition[2];

//         const cellA = inputArray[a].value;
//         const cellB = inputArray[b].value;
//         const cellC = inputArray[c].value;

//         if (cellA === cellB && cellB === cellC && cellA !== "") {
//             winnerStatusTag.innerText = `Player ${cellA} is the winner!`;
//             disableAll();
//             playerStatusTag.innerText = "";
//             return;
//         }
//     }

//     // Check if all cells are filled to declare a draw
//     const allCellsFilled = inputArray.every(cell => cell.value !== "");
//     if (allCellsFilled) {
//         winnerStatusTag.innerText = `No winner! It's a draw.`;
//         disableAll();
//         playerStatusTag.innerText = "";
//     } else {
//         winnerStatusTag.innerText = "";
//     }
// };


startBtn.addEventListener('click', () => {
    console.log(eventCount)
    isStarting = true;
    updateStartAndResetBtn();
    enableAll();
    startGame();
    playerStatusTag.innerText = "Player X's turn";
})

resetBtn.addEventListener('click', () => {
    eventCount = 0;
    isStarting = false;
    updateStartAndResetBtn();
    inputArray.forEach(inputTag => {
        inputTag.value = "";
    });
    disableAll();
    winnerStatusTag.innerText = "";
    playerStatusTag.innerText = "";
})

window.addEventListener('load', () => {
    eventCount = 0;
    inputArray.forEach(element => element.value = "")
    disableAll();
})

const enableAll = () => {
    for(let i = 0; i < inputArray.length; i++) {
        inputArray[i].disabled = false;
    }
}

const disableAll = () => {
    for(let k = 0; k < inputTags.length; k++) {
        inputArray[k].disabled = true;
    }
}