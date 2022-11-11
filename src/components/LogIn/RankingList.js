import { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';

import DetailedInfo from './DetailedInfo';

function createData(posicao, nome, pontos) {
  return { posicao, nome, pontos };
}

export default function RankingList({ list, allInfos }) {
    const [userName, setUserName] = useState('');
    const [userDetailed, setUserDetailed] = useState();

    function changeUserDetailed(nome) {
        setUserName(nome)
        setUserDetailed(allInfos[nome]);
    }

    function back() {
        setUserName('');
        setUserDetailed();
    }

    return (
        <>
            {userDetailed ? 
                <DetailedInfo info={userDetailed.sort((a, b) => a.week - b.week)} nome={userName} back={back} />
                :
                <RankingTable list={list} changeUserDetailed={changeUserDetailed} />
            }
        </>
    );
}

function RankingTable({ list, changeUserDetailed }) {
    const rows = list.map((user, index) => createData(index + 1, user.nome, user.pontos));

    return (
        <Paper>
            <TableContainer>
                <Table sx={{ width: '90vw', minWidth: 350, maxWidth: 800 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ width: 30 }}>Posição</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell sx={{ width: 50 }} align="right">Pontos</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.posicao}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.posicao}
                                </TableCell>
                                <TableCell sx={{ cursor: 'pointer' }} onClick={() => changeUserDetailed(row.nome)}>{row.nome}</TableCell>
                                <TableCell align="right">{row.pontos}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}