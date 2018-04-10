import * as React from "react";
import { Cell } from "./cell";
import { VariantService } from "./gamevariants"
import { Sudoku, IGame } from "./sudoku"
import { Controls } from "./controls";
import { Title } from "./title";
import { ICellInfo } from "./sudoku";
import { GameStore, IGameState, Action } from "./gamestore";
import * as Redux from 'redux';
import * as toastr from 'toastr';

export class Game extends React.Component<{}, IGameState> {

  private sudoku: Sudoku;
  private store: Redux.Store<IGameState>;
  private unsubscribe: Redux.Unsubscribe;

  public constructor(props: any) {
    super(props);

    toastr.options.timeOut = 3000;

    const variantService = new VariantService();
    const gameVariant = variantService.getVariant();

    this.sudoku = new Sudoku();

    this.store = new GameStore().createStoreForGame({
      game: this.sudoku.createGame(gameVariant.filling),
      variant: gameVariant.variant,
      cellInfo: null,
      answer: gameVariant.answer
    });

    this.state = this.store.getState();
  }

  public render() {
    return (
      <div>
        <Title variant={this.state.variant} />

        <table className="sudoku-table">
          <tbody>
            {this.state.game.cells.map((line, i) => {
              return (
                <tr key={i}>
                  {line.map((cell) => <Cell store={this.store} cell={cell} key={cell.j} lastSelectedCell={this.lastSelectedCell.bind(this)} />)}
                </tr>
              );
            })}
          </tbody>
        </table>

        <Controls newGame={() => this.newGame()} check={() => this.check()} openCell={() => this.openCell()} />
      </div>
    );
  }

  public componentDidMount() {
    const self = this;

    this.unsubscribe = this.store.subscribe(function () {
      self.setState(self.store.getState());
    });
  }

  public componentWillUnmount() {
    this.unsubscribe();
  }

  private newGame(): void {
    this.store.dispatch({
      type: Action.NEW_GAME,
    });
  }

  private check(): void {
    const isThereConflict = this.sudoku.isThereConflict(this.state.game.cells);

    if (isThereConflict) {
      toastr.error('В решении есть ошибка');

      return;
    }

    this.sudoku.isComplete(this.state.game.cells)
      ? toastr.success("Поздравляю Вас! Вы правильно решили Судоку")
      : toastr.info("В решении нет ошибок");
  }

  private openCell(): void {

    const cellInfo = this.state.cellInfo;

    if (!cellInfo) {
      return;
    }

    const answerValue = this.state.answer[cellInfo.j + cellInfo.i * 9];

    this.store.dispatch({
      type: Action.OPEN_CELL,
      i: cellInfo.i,
      j: cellInfo.j,
      value: parseInt(answerValue)
    });
  }

  private lastSelectedCell(cellInfo: ICellInfo): void {
    this.store.dispatch({
      type: Action.REMEMEBER_SELECTED_CELL,
      value: cellInfo
    });
  }
}
