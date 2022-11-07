import { useState, useContext } from 'react';
import Swal from 'sweetalert2';
import { TextField, Button } from '@mui/material';

import UserContext from '../../contexts/UserContext';

import { signIn } from '../../api';

import Ranking from './Ranking';

export default function LogIn() {
    const { user, setUser } = useContext(UserContext);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function Login() {
        setLoading(true);

        const body = {
            login,
            senha: password,
            admin: true,
        };
        
        try {
            const { data } = await signIn(body);
            const { login, token } = data;
            setUser({
                login,
                token,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error?.response?.data,
            });
        }

        setLoading(false);
    }

    return (
        <>
            {user ? 
                <Ranking />
                :
                <>
                    <TextField
                        sx={{
                            width: '500px',
                            maxWidth: '90%',
                        }}
                        id="outlined-basic"
                        label="Usuário"
                        variant="outlined"
                        onChange={(event) => setLogin(event.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        sx={{
                            width: '500px',
                            maxWidth: '90%',
                        }}
                        type="password"
                        id="outlined-basic"
                        label="Senha"
                        variant="outlined"
                        onChange={(event) => setPassword(event.target.value)}
                        disabled={loading}
                    />
                    <Button variant="contained" onClick={Login} disabled={loading}>Login</Button>
                </>
            }
        </>
    );
}