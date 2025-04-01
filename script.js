const BOARD_SIZE = [10, 20]
const COLORS = [
    "red",
    "orange",
    "yellow",
    "lime",
    "cyan",
    "blue",
    "magenta",
]


let pos = [0, -10];
let rot = 0;
let pieceIndex = 1;
let pieceData = {};
let currentPiece = [];
let mainScene

function main() {
    mainScene = document.getElementById("main-scene");
    console.log(mainScene)
    for (let i = 0; i < 4; i++) {
        let block = document.createElement("a-box")
        block.setAttribute("position", i.toString() + " 0 -5")
        block.setAttribute("color", COLORS[pieceIndex])
        currentPiece.push(block)
        mainScene.append(block)
    }

    fetch('srs.json')
        .then(response => response.json())
        .then(data => {
            pieceData = data;
            updatePiece()
        })
        .catch(error => console.error('Error loading JSON:', error));

    onkeydown = function (event) {
        input(event);
    }

    addBoard()
}

function addBoard() {
    let halfBoard = [BOARD_SIZE[0] / 2, BOARD_SIZE[1] / 2]
    console.log(halfBoard)
    for (let i = -halfBoard[0]; i < halfBoard[0] + 2; i++) {
        console.log(i)
        let block = document.createElement("a-box")
        block.setAttribute("position", i.toString() + " " + -halfBoard[1].toString() + " -5")
        block.setAttribute("color", "grey")
        mainScene.append(block)
    }
    for (let i = -halfBoard[1] + 1; i < halfBoard[1] + 1; i++) {
        console.log(i)
        let blockOne = document.createElement("a-box")
        let blockTwo = document.createElement("a-box")
        blockOne.setAttribute("position", (halfBoard[0] + 1).toString() + " " + i.toString() + " -5")
        blockTwo.setAttribute("position", -halfBoard[0].toString() + " " + i.toString() + " -5")
        blockOne.setAttribute("color", "grey")
        blockTwo.setAttribute("color", "grey")
        mainScene.append(blockOne)
        mainScene.append(blockTwo)
    }
}

function input(event) {
    console.log(event.key)
    switch (event.key) {
        case "a":
            pos[0]--;
            break;
        case "d":
            pos[0]++;
            break;
        case "ArrowLeft":
            rot += 3;
            rot %= 4;
            break;
        case "ArrowRight":
            rot += 1;
            rot %= 4;
            break;
        case "w":
            pos[1]++;
            break;
    }
    // let thing = document.getElementById("thing")
    // let newPos = pos[0].toString() + " 0 -5"
    // thing.setAttribute("position", newPos)
    updatePiece()
}

function updatePiece() {
    for (let i = 0; i < currentPiece.length; i++) {
        const element = currentPiece[i];
        let newLocalPos = structuredClone(pieceData["pieces"][pieceIndex][rot][i])
        newLocalPos[0] += pos[0]
        newLocalPos[1] += pos[1]
        console.log(newLocalPos)
        element.setAttribute("position", newLocalPos[0].toString() + " " + (-newLocalPos[1]).toString() + " -5")

    }
}

main()