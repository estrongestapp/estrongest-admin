import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';
import { Button, CircularProgress } from '@mui/material';

import UserContext from '../../contexts/UserContext';

import { getAllInfos } from '../../api';
import calculatePoints from '../calculationHelper';

import RankingList from './RankingList';

export default function Ranking() {
    const { user } = useContext(UserContext);
    const [list, setList] = useState([]);
	const [allInfos, setAllInfos] = useState({});
	const [loading, setLoading] = useState(false);

    async function getRanking() {
		setLoading(true);
        try {
            const { data } = await getAllInfos(user.token);
			setAllInfos(data);

            const ranking = [];
            for (const user of Object.keys(data)) {
                const correctFormat = rollback(data[user]);

                const startWeek = moment('2022-06-20').utc(true).week();
                const week = moment().utc(true).week();
    			const thisWeek = week < startWeek ? moment('2022-12-30').utc(true).week() + week : week;

                let total = 0;
                for (let i = startWeek; i <= thisWeek ; i++) {
                    const relativeWeek = i - startWeek;
                    const multiplier = 2 ** Math.floor(relativeWeek / 5);
					const weekToCalculate = i > moment('2022-12-30').utc(true).week() ? i - moment('2022-12-30').utc(true).week() : i;
                    const weekPoints = calculatePoints(correctFormat, weekToCalculate);
                    total += weekPoints * multiplier;
                }

                ranking.push({
                    nome: user,
                    pontos: total,
                });
            }

            setList(ranking.sort((a, b) => {
                if (a.pontos - b.pontos > 0) return -1;
                if (a.pontos - b.pontos < 0) return 1;
                if (a.pontos - b.pontos === 0) return 0;
            }));
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                text: error?.response?.data,
            });
        }
		setLoading(false);
    }

    return (
        <>
            {list.length > 0 ? 
				<RankingList list={list} allInfos={allInfos} />
				:
				(loading ?
					<CircularProgress />
					:
					<Button variant="contained" onClick={getRanking} disabled={loading}>Carregar Ranking</Button>
				)
			}
        </>
    );
}

function rollback(infos) {
	const categories = {
		exercicio: {},
		alimento: {},
		agua: {},
		estudo: {},
		leitura: {},
		notas: {},
		internet: {},
		namoro: {},
		reuniao: {},
		game: {},
		culto: {},
		ministerio: {},
		live: {},
		tarefa: {},
		boaAcao: {},
	};

	for (const {...info} of infos) {
        const week = info.week;
        delete info.week;
        delete info.id;
		for (const category of Object.keys(info)) {
			if (info[category]) {
				categories[category][week] = info[category];
			}
		}
	}

	const {
		exercicio,
		alimento,
		agua,
		estudo,
		leitura,
		notas,
		internet,
		namoro,
		reuniao,
		game,
		culto,
		ministerio,
		live,
		tarefa,
		boaAcao,
	} = categories;

	const oldInfos = {
		fisico: {
			exercicio,
			alimento,
			agua,
		},
		intelectual: {
			estudo,
			leitura,
			notas,
		},
		emocional: {
			internet,
			namoro,
		},
		espiritual: {
			reuniao,
			game,
			culto,
			ministerio,
			live,
			tarefa,
			boaAcao,
		},
	};

	return oldInfos;
}