import React, { Component } from 'react';
import ListaZadan from './ListaZadan';
import PropTypes from "prop-types";

class Karta extends Component {

    constructor() {
        super();
        this.state = {
            pokazSzczegoly: false,
        }
        this.btnTapped = this
            .btnTapped
            .bind(this);
    }
    btnTapped() {
        console.log(this.props.id)
    }
    zmienSzczegoly() {
        this.setState({pokazSzczegoly: !this.state.pokazSzczegoly});
    }

    render() {
        let szczegolyKarty;
        if(this.state.pokazSzczegoly) {
            szczegolyKarty = (
                <div className="card__details">
                    {this.props.opis}
                    <ListaZadan idKarty={this.props.id}
                                zadania={this.props.zadania}
                                funkcjeZwrotne={this.props.funkcjeZwrotne} />
                </div>
            )
        }

        let kolorowyPasek = {
            width: 7,
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            backgroundColor: this.props.kolor
        }

        let przyciski = "";
        //console.log(this.props.status);
        if(this.props.status === "in-progress") {
            przyciski = (
                <div>
                <div className="przycisk_in_progress">
                    <input type="button" value="&#60;" onClick={this.props.funkcjeZwrotne.moveCardToLeft.bind(null, this.props.id)}></input>
                </div>
                <div className="przycisk_in_progress">
                    <input type="button" value="&#62;" onClick={this.props.funkcjeZwrotne.moveCardToRight.bind(null, this.props.id)}></input>
                </div>
                </div>
            );
        } else if(this.props.status === "todo") {
            przyciski = (
                <div className="przycisk_todo">
                    <input type="button" value="&#62;" onClick={this.props.funkcjeZwrotne.moveCardToRight.bind(null, this.props.id)}></input>
                </div>
            );
        } else if(this.props.status === "done") {
            przyciski = (
                <div className="przycisk_done">
                    <input type="button" value="&#60;" onClick={this.props.funkcjeZwrotne.moveCardToLeft.bind(null, this.props.id)}></input>
                </div>
            );
        }


        return (
            <div className="card">
                <div style={kolorowyPasek} />
                <div className={this.state.pokazSzczegoly ?
                "card__title card__title--is-open" : "card__title"}
                onClick={this.zmienSzczegoly.bind(this)}>
                <span dangerouslySetInnerHTML={{__html:this.props.tytul}}></span>
                </div>
                {szczegolyKarty}
                {przyciski}
            </div>

        );
    }
}

let sprawdzamyTytul = (props, propName, componentName) => {
    if(props[propName]) {
        let wartosc = props[propName];
        if(typeof wartosc !== 'string' || wartosc .length > 50) {
            return new Error(
                `Wartość ${propName} w ${componentName} jest dluższa niż 50 znaków`
            )
        }
    }
}

Karta.propTypes = {
    id: PropTypes.number.isRequired,
    tytul: sprawdzamyTytul,
    opis: PropTypes.string,
    status: PropTypes.string,
    kolor: PropTypes.string,
    zadania: PropTypes.arrayOf(PropTypes.object),
    funkcjeZwrotne: PropTypes.object
}

export default Karta;
