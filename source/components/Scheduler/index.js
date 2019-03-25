// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

// Cpmponents
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox';

export default class Scheduler extends Component {
    render () {
        const maxLengthInput = 50;
        const complite = false;

        return (
            <section className = { Styles.scheduler }>
                <main>
                    <header>
                        <h1>
                            Планировщик
                        </h1>
                        <input
                            type = 'text'
                            placeholder = 'Поиск по задачам'
                        />
                    </header>
                    <section>
                        <form action = ''>
                            <input
                                type = 'text'
                                placeholder = 'Описание моей новой задачи (не 50 символов)'
                                maxLength = { maxLengthInput }
                            />
                            <button type = 'submit'>
                                Добавить задачу
                            </button>
                        </form>
                        <ul>
                            <Task />
                        </ul>
                    </section>
                    <footer >
                        <Checkbox
                            inlineBlock
                            checked = { complite }
                            className = { Styles.toggleTaskCompletedState }
                            color1 = '#323232'
                            color2 = '#FFF'
                        />
                        <span className = { Styles.completeAllTasks } >
                            Все задачи выполнены
                        </span>
                    </footer>
                </main>
            </section>
        );
    }
}
