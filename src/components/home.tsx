import React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button } from '@mui/material';

const Home: React.FC = () => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Sistema Restaurante</Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Bem-vindo ao nosso Restaurante!</Typography>
                                <Typography variant="body2">Descubra nossos deliciosos pratos e serviços.</Typography>
                                <Button variant="contained" color="primary">Ver Menu</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Promoções</Typography>
                                <Typography variant="body2">Aproveite nossas ofertas especiais!</Typography>
                                <Button variant="contained" color="secondary">Saiba Mais</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">Contato</Typography>
                                <Typography variant="body2">Entre em contato conosco para mais informações.</Typography>
                                <Button variant="contained" color="default">Contate-nos</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <footer style={{ marginTop: '20px', padding: '10px', textAlign: 'center' }}>
                <Typography variant="body2"> 2025 Sistema Restaurante. Todos os direitos reservados.</Typography>
            </footer>
        </div>
    );
};

export default Home;
