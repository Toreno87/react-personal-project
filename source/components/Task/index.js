// Core
import React, { PureComponent } from 'react';
import { objectOf, number, string, bool } from 'prop-types';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from 'theme/assets/Checkbox';
import Star from 'theme/assets/Star';
import Edit from 'theme/assets/Edit';
import Remove from 'theme/assets/Remove';

export default class Task extends PureComponent {
    static propTypes = {
        completed: bool.isRequired,
        favorite: bool.isRequired,
        id: string.isRequired,
        isDisabled: bool.isRequired,
        maxLengthInput: number.isRequired,
        message: string.isRequired,
        pallete: objectOf(string.isRequired),

    }

    state = {
        isDisabled: true,
        isComplited: null,
        newMessage: null,
        checked: false,
    }

    _handlerCompliteTask = () => {
        const { _complitedTask, id } = this.props;
        const listElement = this._listElement;

        _complitedTask(id);

        this.setState(({ checked }) => ({
            checked: !checked,
        }));
    }

    _handlerRemoveTask = () => {
        const { _removeTask, id } = this.props;

        _removeTask(id);
    }

    _handlerEditTask = () => {
        this.setState(({ isDisabled }) => ({
            isDisabled: !isDisabled,
        }), this._focusedInput);
    }

    _editTask = (event) => {
        this.setState({
            newMessage: event.target.value,
        });
    }

    _focusedInput = () => {
        const taskInput = this._inputElement;

        taskInput.focus();
    }

    render () {
        const {
            favorite,
            maxLengthInput,
            pallete,
            message,
        } = this.props;

        const { newMessage, isDisabled } = this.state;

        const inputTask = (input) => this._inputElement = input;
        const comlitedTask = (li) => this._listElement = li;

        return (

            <li className = { Styles.task } ref = { comlitedTask }>
                <div className = { Styles.content }>
                    <Checkbox
                        className = { Styles.toggleTaskCompletedState }
                        color1 = { pallete.blue }
                        color2 = { pallete.white }
                        inlineBlock
                        onClick = { this._handlerCompliteTask }
                    />
                    <input
                        disabled = { isDisabled }
                        maxLength = { maxLengthInput }
                        placeholder = { `Введите текст для редактирования` }
                        ref = { inputTask }
                        type = 'text'
                        value = { newMessage === null ? message : newMessage }
                        onChange = { this._editTask }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        className = { Styles.toggleTaskFavoriteState }
                        isFavorite = { favorite }
                        color1 = { pallete.blue }
                        color2 = { pallete.dark }
                    />
                    <Edit
                        inlineBlock
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = { pallete.blue }
                        color2 = { pallete.dark }
                        onClick = { this._handlerEditTask }
                    />
                    <Remove
                        inlineBlock
                        color1 = { pallete.blue }
                        color2 = { pallete.dark }
                        onClick = { this._handlerRemoveTask }
                    />
                </div>
            </li>
        );
    }
}
