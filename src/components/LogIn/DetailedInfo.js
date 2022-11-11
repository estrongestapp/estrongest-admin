import { useState } from "react";
import moment from "moment";
import {
    ListSubheader,
    List,
    ListItemButton,
    ListItemText,
    Collapse,
    Paper,
    ListItem,
    Chip
} from "@mui/material";

import weekDays from '../weekDays';

export default function DetailedInfo({ info, nome, back }) {
    const [selectedIndex, setSelectedIndex] = useState();

    const handleClick = (event, index) => {
        if (selectedIndex === index) {
            setSelectedIndex();
        } else {
            setSelectedIndex(index);
        }
    }

    return (
        <Paper sx={{ width: '90vw', minWidth: 350, maxWidth: 800, maxHeight: '100vh' }}>
            <List
                sx={{ width: '100%', bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {nome} 
                        <Chip
                            label="Voltar"
                            onClick={back}
                        />
                    </ListSubheader>
                }
            >
                {info.map((week, index) => <Week key={index} week={week} handleClick={(event) => handleClick(event, index)} selectedIndex={selectedIndex === index} />)}
            </List>
        </Paper>
    );
}

function Week({ week, handleClick, selectedIndex }) {
    const startWeek = moment('2022-06-20').utc(true).week();

    return (
        <>
            <ListItemButton onClick={(event) => handleClick(event, 0)} selected={selectedIndex}>
                <ListItemText primary={`${week.week - startWeek + 1}ª semana`} />
            </ListItemButton>
            <Collapse in={selectedIndex} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Tempo de exercício:</b> {week.exercicio || 0} minutos
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Comeu legume, fruta ou verdura?</b> {Object.entries(week.alimento || {}).map((day) => day[1] ? `${weekDays[moment(day[0]).utc(true).day()]}` : '').join(', ')}
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Bebeu 2 litros de água?</b> {Object.entries(week.agua || {}).map((day) => day[1] ? `${weekDays[moment(day[0]).utc(true).day()]}` : '').join(', ')}
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Tempo de estudo:</b> {week.estudo || 0} minutos
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Páginas lidas:</b> {week.leitura || 0} páginas
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Tirou nota baixa?</b> {week.notas?.length > 0 ? 'Sim': 'Não'}
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Tempo de internet:</b> {Object.entries(week.internet || {}).map((day) => `${weekDays[moment(day[0]).utc(true).day()]}: ${day[1]} minutos`).join(', ')}
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Teve intimidade física:</b> {week.namoro ? 'Sim' : 'Não'}
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Foi na reunião de adolescentes?</b> {week.reuniao ? 'Sim' : 'Não'}
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Venceu o game da semana?</b> {week.game ? 'Sim' : 'Não'}
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Foi no culto de Domingo?</b> {week.culto ? 'Sim' : 'Não'}
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Participou de algum ministério?</b> {week.ministério || 'Não'}
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Assistiu alguma live?</b> {week.live === 'true' ? 'Sim' : (week.live || 'Não')}
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Tarefas feitas:</b> {Object.entries(week.tarefa || {}).map((day) => day[1] ? `${weekDays[moment(`2022-${day[0].split('/')[1]}-${day[0].split('/')[0]}`).utc(true).day()]}` : '').join(', ')}
                        </ListItemText>
                    </ListItem>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemText>
                            <b>Boas ações:</b> {week.boaAcao || 0}
                        </ListItemText>
                    </ListItem>
                </List>
            </Collapse>
        </>
    );
}