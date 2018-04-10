import * as Redux from 'redux';
import { cloneDeep } from 'lodash';
import { ICellInfo, Sudoku } from "./sudoku";
import { IGame } from "./sudoku"
import { VariantService } from "./gamevariants"

export interface IGameState {
  game: IGame,
  variant: number,
  cellInfo: ICellInfo,
  answer: string
}

export enum Action {
  CHANGE_VALUE,
  OPEN_CELL,
  REMEMEBER_SELECTED_CELL,
  NEW_GAME
}

export class GameStore {
  public createStoreForGame(initValue: IGameState): Redux.Store<IGameState> {
    return Redux.createStore<IGameState>((state, action) => {
      state = !state ? {} as IGameState : cloneDeep(state);

      switch (action.type) {
        case Action.CHANGE_VALUE:
          state.game.cells[action.i][action.j].value = action.value;
          break;
        case Action.OPEN_CELL:
          state.game.cells[action.i][action.j].value = action.value;
          break;
        case Action.REMEMEBER_SELECTED_CELL:
          state.cellInfo = action.value;
          break;
        case Action.NEW_GAME:
          const variantService = new VariantService();
          const gameVariant = variantService.getVariant();

          state.game = new Sudoku().createGame(gameVariant.filling);
          state.variant = gameVariant.variant;
          state.cellInfo = null;
          state.answer = gameVariant.answer;

          break;
      }

      return state;
    },
      initValue);
  }
}
