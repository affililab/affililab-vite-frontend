import React from "react";
import {
    DialogAnimate,
    Box,
    IconButton,
    Icon,
    Container,
    useTheme,
    Image,
    Typography,
    Stack,
    useMediaQuery,
    Grid
} from "my-lib";
import { LoginForm } from "./LoginForm"
import {useSelector} from "@store";
import {closeModal, openModal} from "@slices/auth";

export const Content = ({
                            handleCloseModal = () => {
                            }
                        }) => {

    const theme = useTheme();

    const isMd = useMediaQuery(theme.breakpoints.up('md'), {
        defaultMatches: true,
    });

    return <Box
        position={'relative'}
        minHeight={'calc(100vh - 247px)'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        height={1}
    >
        <IconButton sx={{position: "absolute", top: theme.spacing(2), right: theme.spacing(2), zIndex: 2}}
                    aria-label="close" onClick={handleCloseModal}>
            <Icon width={42}
                     height={42}
                     icon={'ei:close'}/>
        </IconButton>
        <Container>
            <Grid container spacing={6}>
                {isMd ? (
                    <Grid item container justifyContent={'center'} xs={12} md={6}>
                        <Box height={1} width={1} maxWidth={500}>
                            <Box
                                component={'img'}
                                src={
                                    '/static/images/login.svg'
                                }
                                width={1}
                                height={1}
                                sx={{
                                    filter:
                                        theme.palette.mode === 'dark'
                                            ? 'brightness(0.8)'
                                            : 'none',
                                }}
                            />
                        </Box>
                    </Grid>
                ) : null}
                <Grid
                    item
                    container
                    alignItems={'center'}
                    justifyContent={'center'}
                    xs={12}
                    md={6}
                >
                    <Stack direction={'column'} spacing={2}>
                        <Box marginBottom={4}>
                            <Typography
                                sx={{
                                    textTransform: 'uppercase',
                                    fontWeight: 'medium',
                                }}
                                gutterBottom
                                color={'text.secondary'}
                            >
                                Login
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 700,
                                }}
                            >
                                Welcome back
                            </Typography>
                            <Typography color="text.secondary">
                                Login to manage your account.
                            </Typography>
                        </Box>
                        <LoginForm openRegister={() => openModal('register')} handleCloseModal={handleCloseModal} />
                    </Stack>
                </Grid>
            </Grid>
        </Container>
    </Box>
}

export const LoginModal = () => {

    const {isModalOpen, mode} = useSelector((state: any) => state.auth);

    return <DialogAnimate maxWidth={"xl"} open={isModalOpen && mode === "login"} onClose={() => {
        closeModal()
    }} key={'something'} sx={{}} variants={null}>
        <Content handleCloseModal={() => {
            closeModal()
        }}/>
    </DialogAnimate>
}
