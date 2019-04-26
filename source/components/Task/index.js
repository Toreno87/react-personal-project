// Core
import React, { PureComponent } from 'react';
import { string, bool } from 'prop-types';

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
        message: string.isRequired,
    }

    state = {
        isTaskEditing: true,
        completed: this.props.completed,
        favorite: this.props.favorite,
        newTaskMessage: this.props.message,
        taskInput: (input) => this._inputElement = input,
    }

    _getTaskShape = ({
        id = this.props.id,
        completed = this.state.completed,
        favorite = this.state.favorite,
        message = this.state.newTaskMessage,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _toggleTaskCompletedState = () => {
        const { _updateTaskAsync } = this.props;
        const taskShape = this._getTaskShape(this.props);

        taskShape.completed = !taskShape.completed;

        this.setState(({ completed }) => ({
            completed: !completed,
        }), () => _updateTaskAsync(taskShape));
    }

    _toggleTaskFavoriteState = () => {
        const { _updateTaskAsync } = this.props;
        const taskShape = this._getTaskShape(this.props);

        taskShape.favorite = !taskShape.favorite;

        this.setState(({ favorite }) => ({
            favorite: !favorite,
        }), () => _updateTaskAsync(taskShape));
    }

    _removeTask = () => {
        const { _removeTaskAsync, id } = this.props;

        _removeTaskAsync(id);
    }

    _updateTask = (event) => {
        const { _updateTaskAsync } = this.props;
        const taskShape = this._getTaskShape(this.props);
        const { isTaskEditing } = this.state;

        if (!isTaskEditing) {
            _updateTaskAsync(taskShape);
        }

        event.preventDefault();

        this.setState(({ isTaskEditing }) => ({
            isTaskEditing: !isTaskEditing,
        }), this._focusedInput);
    }

    _updateNewTaskMessage = (event) => {
        this.setState({
            newTaskMessage: event.target.value,
        });
    }

    _updateTaskMessageOnKeyDown = (event) => {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            this._hendlerUpdateTask(event);
        }
    }

    _hendlerUpdateTask = (event) => {
        this._updateTask(event);
    }

    _focusedInput = () => {
        const taskInput = this._inputElement;

        taskInput.focus();
    }

    _setTaskEditingState = () => {

    }

    _updateTaskMessageOnClick = () => {

    }

    _cancelUpdatingTaskMessage = () => {

    }

    render () {
        const { newTaskMessage, favorite, completed, isTaskEditing, taskInput } = this.state;

        return (

            <li className = { Styles.task } >
                <div className = { Styles.content }>
                    <Checkbox
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = { '#3B8EF3' }
                        color2 = { '#FFF' }
                        height = { 25 }
                        inlineBlock
                        onClick = { this._toggleTaskCompletedState }
                        width = { 25 }
                    />
                    <input
                        disabled = { isTaskEditing }
                        maxLength = { 50 }
                        placeholder = { `Введите текст для редактирования` }
                        ref = { taskInput }
                        type = 'text'
                        value = { newTaskMessage }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = { '#3B8EF3' }
                        height = { 19 }
                        inlineBlock
                        onClick = { this._toggleTaskFavoriteState }
                        width = { 19 }
                    />
                    <Edit
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = { '#323232' }
                        color2 = { '#000' }
                        completed = { isTaskEditing }
                        height = { 19 }
                        inlineBlock
                        onClick = { this._updateTask }
                        width = { 19 }
                    />
                    <Remove
                        className = { Styles.removeTask }
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        height = { 17 }
                        inlineBlock
                        onClick = { this._removeTask }
                        width = { 17 }
                    />
                </div>
            </li>
        );
    }
}
