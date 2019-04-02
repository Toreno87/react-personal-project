//Core
import React, { Component } from 'react';

export default class AddTask extends Component {
    render () {
        const maxLengthInput = this.props.maxLengthInput;

        return (
            <form action = ''>
                <input
                    maxLength = { maxLengthInput }
                    placeholder = { `Описание моей новой задачи` }
                    type = 'text'
                />
                <button type = 'submit'>
                    { `Добавить задачу` }
                </button>
            </form>
        );
    }
}
