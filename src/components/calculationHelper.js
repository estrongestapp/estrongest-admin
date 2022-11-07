/* eslint-disable */

const multipliers = {
    agua: 1,
    alimento: 1,
    exercicio: 1/18,
    estudo: 1/30,
    leitura: 1/5,
    notas: -2,
    internet: 2,
    namoro: 10,
    reuniao: 5,
    game: 2,
    culto: 5,
    ministerio: 5,
    live: 3,
    tarefa: 2,
    boaAcao: 3,
};

function calculateFisico(fisico, week) {
    const agua = fisico?.agua || {};
    const alimento = fisico?.alimento || {};
    const exercicio = fisico?.exercicio || {};

    const thisWeekFisico = {
        agua: `${week}` in agua ? agua[week] : {},
        alimento: `${week}` in alimento ? alimento[week] : {},
        exercicio: `${week}` in exercicio ? exercicio[week] : 0,
    };

    return calculateFisicoPoints(thisWeekFisico);
}

function calculateFisicoPoints(thisWeekFisico) {
    const { agua, alimento, exercicio } = thisWeekFisico;

    let aguaPoints = Object.values(agua).filter((value) => value).length * multipliers.agua;
    let alimentoPoints = Object.values(alimento).filter((value) => value).length * multipliers.alimento;
    let exercicioPoints = exercicio * multipliers.exercicio;

    if (aguaPoints > 5) aguaPoints = 5;
    if (alimentoPoints > 5) alimentoPoints = 5;
    if (exercicioPoints > 10) exercicioPoints = 10;

    return aguaPoints + alimentoPoints + Math.floor(exercicioPoints);
}

function calculateIntelectual(intelecutal, week) {
    const estudo = intelecutal?.estudo || {};
    const leitura = intelecutal?.leitura || {};
    const notas = intelecutal?.notas || {};

    const thisWeekIntelectual = {
        estudo: `${week}` in estudo ? estudo[week] : 0,
        leitura: `${week}` in leitura ? leitura[week] : 0,
        notas: `${week}` in notas ? notas[week] : 0,
    };

    return calculateIntelectualPoints(thisWeekIntelectual);
}

function calculateIntelectualPoints(thisWeekIntelectual) {
    const { estudo, leitura, notas } = thisWeekIntelectual;

    let estudoPoints = estudo * multipliers.estudo;
    let leituraPoints = leitura * multipliers.leitura;
    let notasPoints = notas == false ? 0 : notas.length * multipliers.notas;

    if (estudoPoints > 10) estudoPoints = 10;
    if (leituraPoints > 10) leituraPoints = 10;

    return Math.floor(estudoPoints) + Math.floor(leituraPoints) + notasPoints;
}

function calculateEmocional(emocional, week) {
    const internet = emocional?.internet || {};
    const namoro = emocional?.namoro || {};

    const thisWeekEmocional = {
        internet: `${week}` in internet ? internet[week] : {},
        namoro: `${week}` in namoro ? namoro[week] : false,
    };

    return calculateEmocionalPoints(thisWeekEmocional);
}

function calculateEmocionalPoints(thisWeekEmocional) {
    const { internet, namoro } = thisWeekEmocional;

    let internetPoints = 10;
    for (const minutes of Object.values(internet)) {
        let factor;

        if (minutes <= 120) {
            factor = 0;
        } else if (minutes <= 180) {
            factor = -1;
        } else {
            factor = -2;
        }

        internetPoints += factor * multipliers.internet;
    }
    let namoroPoints = (namoro ? 0 : 1) * multipliers.namoro;

    return internetPoints + namoroPoints;
}

function calculateEspiritual(espiritual, week) {
    const reuniao = espiritual?.reuniao || {};
    const game = espiritual?.game || {};
    const culto = espiritual?.culto || {};
    const ministerio = espiritual?.ministerio || {};
    const live = espiritual?.live || {};
    const tarefa = espiritual?.tarefa || {};
    const boaAcao = espiritual?.boaAcao || {};

    const thisWeekEspiritual = {
        reuniao: `${week}` in reuniao ? reuniao[week] : false,
        game: `${week}` in game ? game[week] : false,
        culto: `${week}` in culto ? culto[week] : false,
        ministerio: `${week}` in ministerio ? ministerio[week] : false,
        live: `${week}` in live ? live[week] : false,
        tarefa: `${week}` in tarefa ? tarefa[week] : {},
        boaAcao: `${week}` in boaAcao ? boaAcao[week] : 0,
    };

    return calculateEspiritualPoints(thisWeekEspiritual);
}

function calculateEspiritualPoints(thisWeekEspiritual) {
    const { reuniao, game, culto, ministerio, live, tarefa, boaAcao } = thisWeekEspiritual;

    let reuniaoPoints = (reuniao ? 1 : 0) * multipliers.reuniao;
    let gamePoints = (game ? 1 : 0) * multipliers.game;
    let cultoPoints = (culto ? 1 : 0) * multipliers.culto;
    let ministerioPoints = (ministerio ? 1 : 0) * multipliers.ministerio;
    let livePoints = (live ? 1 : 0) * multipliers.live;
    let tarefaPoints = Object.values(tarefa).filter((value) => value).length * multipliers.tarefa;
    let boaAcaoPoints = boaAcao * multipliers.boaAcao;

    if (boaAcao >= 3) boaAcaoPoints = 10;

    return reuniaoPoints + gamePoints + cultoPoints + ministerioPoints + livePoints + tarefaPoints + boaAcaoPoints;
}

export default function calculatePoints(information, week) {
    const fisico = information?.fisico || {};
    const intelectual = information?.intelectual || {};
    const emocional = information?.emocional || {};
    const espiritual = information?.espiritual || {};

    const fisicoPoints = calculateFisico(fisico, week);
    const intelectualPoints = calculateIntelectual(intelectual, week);
    const emocionalPoints = calculateEmocional(emocional, week);
    const espiritualPoints = calculateEspiritual(espiritual, week);

    return fisicoPoints + intelectualPoints + emocionalPoints + espiritualPoints;
}