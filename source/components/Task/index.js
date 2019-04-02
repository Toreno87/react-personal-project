// Core
import React, { PureComponent } from 'react';

// Instruments
import Styles from './styles.m.css';

// Components
import Checkbox from 'theme/assets/Checkbox';
import Star from 'theme/assets/Star';
import Edit from 'theme/assets/Edit';
import Remove from 'theme/assets/Remove';
import { Consumer } from 'components/HOC/withProfile';

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
        const {
            isDisabled,
            toggleTaskCompletedState,
            maxLengthInput,
            palleteBlue,
            palleteWhite,
        } = this.props;

        return (
            <li className = { Styles.task }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { toggleTaskCompletedState }
                        className = { Styles.toggleTaskCompletedState }
                        color1 = { palleteBlue }
                        color2 = { palleteWhite }
                    />
                    <input
                        type = 'text'
                        disabled = { isDisabled }
                        maxLength = { maxLengthInput }
                        placeholder = { `тут будет какой-то текст...` }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        className = { Styles.toggleTaskFavoriteState }
                        color1 = { palleteBlue }
                        color2 = { palleteWhite }
                    />
                    <Edit
                        inlineBlock
                        className = { Styles.updateTaskMessageOnClick }
                        color1 = { palleteBlue }
                        color2 = { palleteWhite }
                    />
                    <Remove
                        inlineBlock
                        color1 = { palleteBlue }
                        color2 = { palleteWhite }
                    />
                </div>
            </li>
        );
    }
}
