import React, { Component } from "react";
import update from 'immutability-helper';
import TabliaKanban from "./TablicaKanban";

class TablicaKanbanKontener extends Component {
    constructor() {
        super();
        this.state = {
            karty: []
        };
    }

    componentDidMount() {
        fetch('./karty.json')
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({karty: responseData});
        })
            .catch((error) => {
                console.log('Błąd pobierania i przetwarzania danych.', error)
            });
    }

    dodajZadanie(idKarty, nazwaZadania) {
        console.log(`idKarty: '${idKarty}', nazwaZadania: '${nazwaZadania}'`);

        let indexKarty = this.state.karty.findIndex((karta) => karta.id === idKarty);

        let noweZadanie = {id: Date.now(), nazwa: nazwaZadania, zrobione: false};

        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                zadania: {$push: [noweZadanie]}
            }
        });

        this.setState({karty: nowyStan});
    }

    usunZadanie(idKarty, idZadania, indexZadania) {
        console.log(`idKarty: '${idKarty}', idZadania: '${idZadania}', indexZadania: '${indexZadania}'`);

        let indexKarty = this.state.karty.findIndex((karta) => karta.id === idKarty);

        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                zadania: {$splice: [[indexZadania, 1]]}
            }
        });

        this.setState({karty: nowyStan});

    }

    zmienZadanie(idKarty, idZadania, indexZadania) {
        console.log(`idKarty: '${idKarty}', idZadania: '${idZadania}', indexZadania: '${indexZadania}'`);

        let indexKarty = this.state.karty.findIndex((karta) => karta.id === idKarty);

        // console.log(indexKarty)

        let nowaWartoscZrobione;

        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                zadania: {
                    [indexZadania]: {
                        zrobione: {
                            $apply: (zrobione) => {
                                nowaWartoscZrobione = !zrobione;
                                console.log(`Zmieniamy zrobione na: ${nowaWartoscZrobione}`);
                                return nowaWartoscZrobione;
                            }
                        }
                    }
                }
            }
        });
        this.setState({karty: nowyStan});
    }

    moveCardToRight(idKarty) {
        let indexKarty = this.state.karty.findIndex((karta) => karta.id === idKarty)
        let staryStatus = this.state.karty[indexKarty].status
        let nowyStatus
        if(staryStatus === 'todo') {
            nowyStatus = 'in-progress'
        } else if(staryStatus === 'in-progress') {
            nowyStatus = 'done'
        }

        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                status: {$set: nowyStatus}
            }
        })

        this.setState({karty: nowyStan});
        console.log(nowyStan)
    }

    moveCardToLeft(idKarty) {
        let indexKarty = this.state.karty.findIndex((karta) => karta.id === idKarty)
        let staryStatus = this.state.karty[indexKarty].status
        let nowyStatus
        if(staryStatus === 'in-progress') {
            nowyStatus = 'todo'
        } else if(staryStatus === 'done') {
            nowyStatus = 'in-progress'
        }

        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                status: {$set: nowyStatus}
            }
        })

        this.setState({karty: nowyStan});
        console.log(nowyStan)
    }

    render() {
        return (
            <TabliaKanban karty={this.state.karty}
                funkcjeZwrotne = {{
                    dodaj: this.dodajZadanie.bind(this),
                    usun: this.usunZadanie.bind(this),
                    zmien: this.zmienZadanie.bind(this),
                    moveCardToRight: this.moveCardToRight.bind(this),
                    moveCardToLeft: this.moveCardToLeft.bind(this)
                }}
            />
        );
    }
}

export default TablicaKanbanKontener;
