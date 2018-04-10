import { chunk } from 'lodash';

export interface ICellInfo {
    value: number,
    editable: boolean,
    i: number,
    j: number,
    hasConflict: boolean
}

export interface IGame {
    cells: ICellInfo[][]
}

export class Sudoku {

    private cells: ICellInfo[][];

    public markAllWithoutConflict(cells: ICellInfo[][]): void {
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
                cells[i][j].hasConflict = false;
            }
        }
    }

    public isThereConflict(cells: ICellInfo[][]): boolean {
        this.markAllWithoutConflict(cells);

        for (var i = 0; i < 9; i++) {
            let arr = [];

            for (let j = 0; j < 9; j++) {
                arr.push(cells[i][j]);
            }

            this.checkSubset(arr);
        }

        for (let j = 0; j < 9; j++) {
            let arr = [];

            for (let i = 0; i < 9; i++) {
                arr.push(cells[i][j]);
            }

            this.checkSubset(arr);
        }

        this.checkSubset([cells[0][0], cells[0][1], cells[0][2], cells[1][0], cells[1][1], cells[1][2], cells[2][0], cells[2][1], cells[2][2]]);
        this.checkSubset([cells[3][0], cells[3][1], cells[3][2], cells[4][0], cells[4][1], cells[4][2], cells[5][0], cells[5][1], cells[5][2]]);
        this.checkSubset([cells[6][0], cells[6][1], cells[6][2], cells[7][0], cells[7][1], cells[7][2], cells[8][0], cells[8][1], cells[8][2]]);

        this.checkSubset([cells[0][3], cells[0][4], cells[0][5], cells[1][3], cells[1][4], cells[1][5], cells[2][3], cells[2][4], cells[2][5]]);
        this.checkSubset([cells[3][3], cells[3][4], cells[3][5], cells[4][3], cells[4][4], cells[4][5], cells[5][3], cells[5][4], cells[5][5]]);
        this.checkSubset([cells[6][3], cells[6][4], cells[6][5], cells[7][3], cells[7][4], cells[7][5], cells[8][3], cells[8][4], cells[8][5]]);

        this.checkSubset([cells[0][6], cells[0][7], cells[0][8], cells[1][6], cells[1][7], cells[1][8], cells[2][6], cells[2][7], cells[2][8]]);
        this.checkSubset([cells[3][6], cells[3][7], cells[3][8], cells[4][6], cells[4][7], cells[4][8], cells[5][6], cells[5][7], cells[5][8]]);
        this.checkSubset([cells[6][6], cells[6][7], cells[6][8], cells[7][6], cells[7][7], cells[7][8], cells[8][6], cells[8][7], cells[8][8]]);

        return [].concat(...cells).filter((item: ICellInfo) => item.hasConflict).length !== 0;
    }

    public isComplete(cells: ICellInfo[][]) {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = cells[i][j];

                if (cell.hasConflict || cell.value === null) {
                    return false;
                }
            }
        }

        return true;
    }

    public createGame(gameVariant: string): IGame {
        let array = [];

        for (let i = 0; i < 81; i++) {
            array.push(gameVariant[i] === '0' ? null : parseInt(gameVariant[i]));
        }

        array = chunk(array, 9);

        const game: ICellInfo[][] = []

        for (let i = 0; i < 9; i++) {
            const line: ICellInfo[] = [];

            for (let j = 0; j < 9; j++) {
                line.push(this.newCell(i, j, array[i][j], array[i][j] === null));
            }

            game.push(line);
        }

        this.cells = game;

        return this.newGame(game);
    }

    private newCell(i: number, j: number, value: number, editable: boolean): ICellInfo {
        return { value, editable, hasConflict: false, i, j }
    }

    private newGame(cells: ICellInfo[][]): IGame {
        return { cells }
    }

    private checkSubset(array: ICellInfo[]): void {
        const nums: { [key: string]: number } = {};

        for (var i = 0; i < 9; i++) {
            if (array[i].value !== null && nums.hasOwnProperty(array[i].value.toString())) {
                array[i].hasConflict = true;
                array[nums[array[i].value]].hasConflict = true;
            }

            nums[array[i].value] = i;
        }
    }
}
