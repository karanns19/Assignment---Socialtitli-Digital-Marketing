import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/Auth';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert'
import { Grid } from '@mui/material';
import LoadingSpinner from '../themes/LoadingSpinner';

const LoginPage = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.email.value;
        const password = e.target.password.value;
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.message);
                login();
                navigate('/dashboard');
                setLoading(false);
            } else {
                console.log(data.message);
                setLoading(false);
            }
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
            console.log('Please try again later');
        }
    };

    return (
        <Box className='content-right' sx={{ backgroundColor: 'background.paper', display: 'flex', padding: '1%' }}>
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    width: '50%',
                    position: 'relative',
                    alignItems: 'center',
                    borderRadius: '20px',
                    justifyContent: 'center',
                    backgroundColor: 'customColors.bodyBg',
                }}
            >
                <img src="./login.png" height={500} alt="" />
            </Box>
            <Box
                sx={{
                    p: [6, 12],
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box sx={{ width: '100%', maxWidth: 500 }}>
                    <img src="./socialtitli.png" width={100} alt="" />
                    <Box sx={{ my: 4 }}>
                        <Typography variant='h4' sx={{ mb: 1.5 }}>
                            {`Welcome to SocialTitli ! 👋🏻`}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Please sign-in to your account and start the adventure
                        </Typography>
                    </Box>
                    <Alert icon={false} sx={{ py: 1, mb: 4 }}>
                        <Typography variant='body2' sx={{ color: 'primary.main' }}>
                            Admin: <strong>karanns.aero19@gmail.com</strong> / Pass: <strong>ks191099</strong>
                        </Typography>
                    </Alert>
                    <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {/* Email Input */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>

                            {/* Password Input */}
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                mb: 1.75,
                                display: 'flex',
                                flexWrap: 'wrap',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                        </Box>
                        {loading ? (
                                <LoadingSpinner />
                            ) : (
                                <></>
                            )}
                        <Button fullWidth type='submit' variant='contained' sx={{ mb: 4 }}>
                            Login
                        </Button>
                    </form>
                </Box>
            </Box>
        </Box>
    );

}

export default LoginPage