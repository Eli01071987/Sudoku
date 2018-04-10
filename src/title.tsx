import * as React from 'react';

interface ITitle {
    variant: number;
}

export class Title extends React.Component<ITitle, {}> {
    render() {
        return (
            <h1 className='head'>Вариант {this.props.variant}</h1>
        )
    }
}
