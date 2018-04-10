import * as React from 'react';

interface IControls {
  newGame: () => void,
  check: () => void,
  openCell: () => void
}

export class Controls extends React.Component<IControls, {}> {
  render() {
    return (
      <div className="controls">
        <button className="btn btn-s btn-primary" onClick={this.props.newGame}>Новая игра</button>
        <button className="btn btn-s btn-primary" onClick={this.props.check}>Проверить</button>
        <button className="btn btn-s btn-primary" onClick={this.props.openCell}>Откртыь ячейку</button>
      </div>
    )
  }
}