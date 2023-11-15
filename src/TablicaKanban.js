import React, { Component } from 'react';
import Lista from './Lista';
import PropTypes from "prop-types";

class TablicaKanban extends Component {

    render() {
        return (
            <div className="app">
                <Lista id="todo" tytul="Do zrobienia" funkcjeZwrotne={this.props.funkcjeZwrotne}
                       karty={this.props.karty.filter((karta) => karta.status == 'todo') } />
                <Lista id="in-progress" tytul="W toku" funkcjeZwrotne={this.props.funkcjeZwrotne}
                       karty={this.props.karty.filter((karta) => karta.status == 'in-progress') } />
                <Lista id="done" tytul="Zrobione" funkcjeZwrotne={this.props.funkcjeZwrotne}
                       karty={this.props.karty.filter((karta) => karta.status == 'done') } />
            </div>
        )
    }
}

TablicaKanban.propTypes = {
    karty: PropTypes.arrayOf(PropTypes.object).isRequired,
    funkcjeZwrotne: PropTypes.object
}

export default TablicaKanban;