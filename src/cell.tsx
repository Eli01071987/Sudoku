import * as React from "react";
import { ICellInfo } from "./sudoku";
import { IGameState, Action } from "./gamestore";
import * as Redux from 'redux';

interface ICellProps {
  cell: ICellInfo,
  lastSelectedCell: (cellInfo: ICellInfo) => void,
  store: Redux.Store<IGameState>
}

export class Cell extends React.Component<ICellProps, {}> {

  public constructor(props: ICellProps) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const cell = this.props.cell;
    const classes = [];

    classes.push('i' + cell.i);
    classes.push('j' + cell.j);

    return (
      <td className={classes.join(' ')}>
        <input
          disabled={!cell.editable}
          value={cell.value || ''}
          onClick={this.onClick}
          onChange={this.onChange} />
      </td>
    );
  }

  private onClick(event: any) {
    event.preventDefault();
    event.target.select();

    this.props.lastSelectedCell(this.props.cell);
  }

  private onChange(event: any) {
    event.preventDefault();
    const cell = this.props.cell;

    if (!cell.editable) {
      return;
    }

    const newValue = event.target.value;

    if (newValue !== '' && !/^\d$/.test(newValue)) {
      event.target.value = cell.value;
    }

    this.props.store.dispatch({
      type: Action.CHANGE_VALUE,
      i: cell.i,
      j: cell.j,
      value: newValue === '' ? null : parseInt(newValue)
    });
  }
}
