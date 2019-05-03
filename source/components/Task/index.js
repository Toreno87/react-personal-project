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
        isTaskEditing: false,
        completed: this.props.completed,
        favorite: this.props.favorite,
        newMessage: this.props.message,
    }

    taskInput = React.createRef();

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _toggleTaskCompletedState = () => {
        const { _updateTaskAsync } = this.props;
        const { completed } = this.props;
        const taskShape = this._getTaskShape({});

        taskShape.completed = !completed;

        _updateTaskAsync(taskShape);

        this.setState({
            completed: taskShape.completed,
        });
    }

    _toggleTaskFavoriteState = () => {
        const { _updateTaskAsync } = this.props;
        const { favorite } = this.props;
        const taskShape = this._getTaskShape({});

        taskShape.favorite = !favorite;

        _updateTaskAsync(taskShape);

        this.setState({
            favorite: taskShape.favorite,
        });
    }

    _removeTask = () => {
        const { _removeTaskAsync, id } = this.props;

        _removeTaskAsync(id);
    }

    _updateTask = () => {
        const { _updateTaskAsync } = this.props;
        const { message } = this.props;
        const { newMessage } = this.state;
        const taskShape = this._getTaskShape({ message: newMessage });

        this._setTaskEditingState(false);

        if (message === newMessage) {
            return null;
        }

        _updateTaskAsync(taskShape);
    }

    _updateTaskMessageOnClick = () => {
        const { isTaskEditing } = this.state;

        if (isTaskEditing) {
            this._updateTask();

            return null;
        }

        this._setTaskEditingState(true);
    }

    _updateTaskMessageOnKeyDown = (event) => {
        const enterKey = event.key === 'Enter';
        const escapeKey = event.key === 'Escape';
        const { newMessage } = this.state;

        if (newMessage === '') {
            return null;
        }

        if (enterKey) {
            this._updateTask();
        }

        if (escapeKey) {
            this._cancelUpdatingTaskMessage();
        }
    }

    _cancelUpdatingTaskMessage = () => {
        this.taskInput.current.disabled = true;

        this.setState({
            newMessage: this.props.message,
            isTaskEditing: false,
        });
    }

    _updateNewTaskMessage = (event) => {
        this.setState({
            newMessage: event.target.value,
        });
    }

    _setTaskEditingState = (isTaskEditing) => {
        if (isTaskEditing) {
            this.taskInput.current.disabled = false;
            this.taskInput.current.focus();
        } else {
            this.taskInput.current.disabled = true;
        }

        this.setState({
            isTaskEditing,
        });
    }

    render () {
        const { newMessage, favorite, completed, isTaskEditing } = this.state;
        const { taskInput } = this;

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
                        disabled
                        maxLength = { 50 }
                        ref = { taskInput }
                        type = 'text'
                        value = { newMessage }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        height = { 19 }
                        inlineBlock
                        onClick = { this._toggleTaskFavoriteState }
                        width = { 19 }
                    />
                    <Edit
                        checked = { false }
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = { '#3B8EF3' }
                        color2 = { '#000' }
                        height = { 19 }
                        inlineBlock
                        onClick = { this._updateTaskMessageOnClick }
                        width = { 19 }
                    />
                    <Remove
                        checked = { false }
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
