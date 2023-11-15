import React, { Component } from 'react';
import PropTypes from "prop-types";

class ListaZadan extends Component {

    sprawdzKlawisz(evt) {
        if(evt.key === 'Enter') {
            this.props.funkcjeZwrotne.dodaj(this.props.idKarty, evt.target.value);
            evt.target.value='';
        }
    }

    render() {
        let zadania = this.props.zadania.map((zadanie, indexZadania) => (
            <li key={zadanie.id} className="checklist__task">
                <input type="checkbox" defaultChecked={zadanie.zrobione}
                    onChange={this.props.funkcjeZwrotne.zmien.bind(null,
                    this.props.idKarty, zadanie.id, indexZadania)} />
                {zadanie.nazwa}
                <span className="checklist__task--remove"
                    onClick={this.props.funkcjeZwrotne.usun.bind(null,
                        this.props.idKarty, zadanie.id, indexZadania)}></span>
            </li>
        ));
        return (
            <div className="checklist">
                <ul>{zadania}</ul>
                <input type="text"
                       className="checklist__add-task"
                       placeholder="Proszę podać nazwę i nacisnąć Enter, aby dodać zadanie"
                       onKeyUp={this.sprawdzKlawisz.bind(this)} />
            </div>
        );
    }
}

ListaZadan.propTypes = {
    idKarty: PropTypes.number.isRequired,
    zadania: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ListaZadan;