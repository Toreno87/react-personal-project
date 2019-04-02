// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')

// Cpmponents
import Header from 'components/Header';
import Board from 'components/Board';
import Footer from 'components/Footer';

export default class Scheduler extends Component {
    render () {
        return (
            <section className = { Styles.scheduler }>
                <main>
                    <Header />
                    <Board />
                    <Footer />
                </main>
            </section>
        );
    }
}
