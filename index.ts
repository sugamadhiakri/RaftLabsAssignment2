import * as readline from "readline";
import { exit } from "process";

const chessBoard = [
    ['a8', 'b8', 'c8', 'd8', 'e8', 'f8', 'g8', 'h8'],
    ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
    ['a6', 'b6', 'c6', 'd6', 'e6', 'f6', 'g6', 'h6'],
    ['a5', 'b5', 'c5', 'd5', 'e5', 'f5', 'g5', 'h5'],
    ['a4', 'b4', 'c4', 'd4', 'e4', 'f4', 'g4', 'h4'],
    ['a3', 'b3', 'c3', 'd3', 'e3', 'f3', 'g3', 'h3'],
    ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
    ['a1', 'b1', 'c1', 'd1', 'e1', 'f1', 'g1', 'h1'],
];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const displayBoard = (board: string[][]) => {
    board.forEach(row => {
        let r = "";
        row.forEach(e => {
            r += e + " ";
        });
        console.log(r);
    });
};



const getCoordinates = (pos: string): { x: number, y: number; } => {
    for (let i = 0; i < chessBoard.length; i++) {
        for (let j = 0; j < chessBoard.length; j++) {
            if (chessBoard[i][j] === pos) return { x: j, y: i };
        }
    }

    return null;
};

// Assumes valid position
const getDestinations = (pos: string): string[][] => {

    const board = chessBoard.map(row => {
        return row.map(element => element);
    });

    const coordinate = getCoordinates(pos);

    if (!coordinate) {
        console.log("Invalid Chess Position");
        return;
    }

    const X = [2, 1, -1, -2, -2, -1, 1, 2];
    const Y = [1, 2, 2, 1, -1, -2, -2, -1];

    for (let i = 0; i < 8; i++) {
        const x = coordinate.x + X[i];
        const y = coordinate.y + Y[i];

        if (x > 7 || y > 7) continue;
        try {
            board[y][x] = "__";
        } catch (err) { }
    }

    return board;
};


const takeInput = () => {
    rl.question("Enter Knight's Position (0 to exit)> ", position => {

        // Exit condition
        if (position === '0') exit();


        const modifiedChessBoard = getDestinations(position);

        console.log(`The available position for ${position} is: \n`);

        displayBoard(modifiedChessBoard);
        exit();
    });
};

const main = () => {
    console.log("\n\n ------------------- \n\n");
    displayBoard(chessBoard);
    takeInput();
};

main();