// Core
import React, { PureComponent } from 'react';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';

export default class Task extends PureComponent {
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

    render () {
        const maxLengthInput = 50;
        const isDisabled = true;
        const complite = false;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { complite }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = '#3B8EF3'
                        color2 = '#FFF'
                    />
                    <input
                        type = 'text'
                        maxLength = { maxLengthInput }
                        disabled = { isDisabled }
                        value = 'тут будет какой-то текст...'
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = '#3B8EF3'
                        color2 = '#323232'
                    />
                    <Edit
                        inlineBlock
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = '#3B8EF3'
                        color2 = '#323232'
                    />
                    <Remove
                        inlineBlock
                        color1 = '#3B8EF3'
                        color2 = '#323232'
                    />
                </div>
            </li>
        );
    }
}
