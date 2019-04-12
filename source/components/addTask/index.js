//Core
import React, { Component } from 'react';
import { func, number } from 'prop-types';

export default class AddTask extends Component {
    static propTypes = {
        _createTask: func.isRequired,
        maxLengthInput: number.isRequired,
    }

    state = {
        message: '',
    }

    _updateMessage = (event) => {
        this.setState({
            message: event.target.value,
        });
    }

    _hendlerForSubmit = (event) => {
        event.preventDefault();
        this._submitMessage();
    }

    _submitMessage = () => {
        const { message } = this.state;

        if (!message) {
            return null;
        }

        this.props._createTask(message);

        this.setState({
            message: '',
        });
    }

    _submitOnEnter = (event) => {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
            this._submitMessage();
        }
    }

    render () {
        const { maxLengthInput } = this.props;
        const { message } = this.state;

        return (
            <form onSubmit = { this._hendlerForSubmit }>
                <input
                    maxLength = { maxLengthInput }
                    placeholder = { `Описание моей новой задачи` }
                    type = 'text'
                    value = { message }
                    onChange = { this._updateMessage }
                    onKeyPress = { this._submitOnEnter }
                />
                <button type = 'submit'>
                    { `Добавить задачу` }
                </button>
            </form>
        );
    }
}
