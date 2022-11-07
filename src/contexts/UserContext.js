import { createContext } from 'react';

const UserContext = createContext();

export default UserContext;

/*
    {
        fisico: {
            exercico: {
                'semana': number,
            }
            alimento: {
                'semana': {
                    'dia': boolean,
                },
            },
            agua: {
                'semana': {
                    'dia': boolean,
                },
            },
        },
        intelectual: {
            estudo: {
                'semana': number,
            },
            leitura: {
                'semana': number,
            },
            notas: {
                'semana': [
                    {
                        materia: string,
                        nota: number,
                    }
                ]
            }
        },
        emocional: {
            internet: {
                'semana': {
                    'dia': number,
                },
            },
            namoro: {
                'semana': boolean,
            },
        },
        espiritual: {
            reuniao: {
                'semana': boolean,
            },
            game: {
                'semana': boolean,
            },
            culto: {
                'semana': boolean,
            },
            ministerio: {
                'semana': boolean,
            },
            live: {
                'semana': boolean,
            },
            leitura: {
                'semana': {
                    'dia': boolean,
                },
            },
            boaAcao: {
                'semana': number,
            },
        },
    };
*/