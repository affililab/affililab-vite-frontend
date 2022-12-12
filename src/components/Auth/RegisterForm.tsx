import React, {FC, useState} from 'react';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { useAuth, useSnackbar, FormProvider, RHFTextField, Icon, Link, useIsMountedRef, Box, Grid, IconButton, InputAdornment, Typography, LoadingButton } from 'my-lib';

type RegisterFormProps = {
    onFinish: () => void;
    openLogin: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({
                                          onFinish = () => {},
                                          openLogin = () => {}
                                      }) => {
    const {register} = useAuth();

    const {enqueueSnackbar} = useSnackbar();
    const isMountedRef = useIsMountedRef();
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const RegisterSchema = Yup.object().shape({
        firstName: Yup.string().required('First name required'),
        lastName: Yup.string().required('Last name required'),
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
        passwordConfirmation: Yup.string().required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const defaultValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
    };

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: {errors, isSubmitting},
    }: any = methods;

    const onSubmit = async (data: { email: string, password: string, passwordConfirmation: string, firstName: string, lastName: string }) => {
        console.log(data);
        try {
            await register(data.email, data.password, data.passwordConfirmation, data.firstName, data.lastName);
            onFinish();
        } catch (error) {
            console.error(error);
            reset();
            if (isMountedRef.current) {
                setError('afterSubmit', error);
            }
        }
    };

    return <Box>
        <Box marginBottom={4}>
            <Typography
                sx={{
                    textTransform: 'uppercase',
                    fontWeight: 'medium',
                }}
                gutterBottom
                color={'text.secondary'}
            >
                Signup
            </Typography>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                }}
            >
                Create an account
            </Typography>
            <Typography color="text.secondary">
                Fill out the form to get started.
            </Typography>
        </Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                        Enter your first name
                    </Typography>
                    <RHFTextField
                        label="First name *"
                        variant="outlined"
                        name={'firstName'}
                        size={"medium"}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                        Enter your last name
                    </Typography>
                    <RHFTextField  label="Last name *"
                                   variant="outlined"
                                   name={'lastName'}
                                   size={"medium"}
                                   fullWidth />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                        Enter your Email Address
                    </Typography>
                    <RHFTextField  label="Email Address *"
                                   variant="outlined"
                                   size={"medium"}
                                   fullWidth name="email" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                        Enter your password
                    </Typography>
                    <RHFTextField
                        name="password"
                        label="Password *"
                        placeholder="password"
                        size={"medium"}
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                                        <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                        Repeat your Password
                    </Typography>
                    <RHFTextField
                        name="passwordConfirmation"
                        label="Password Confirmation *"
                        placeholder="confirm password"
                        size={"medium"}
                        variant="outlined"
                        fullWidth
                        type={showPasswordConfirmation ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}>
                                        <Icon icon={showPasswordConfirmation ? 'eva:eye-fill' : 'eva:eye-off-fill'}/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item container xs={12}>
                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        alignItems={{ xs: 'stretched', sm: 'center' }}
                        justifyContent={'space-between'}
                        width={1}
                    >
                        <Box marginBottom={{ xs: 1, sm: 0 }}>
                            <Typography variant={'subtitle2'}>
                                Already have an account?{' '}
                                <Link
                                    onClick={ (e) => { e.preventDefault(); openLogin() } }
                                    component={'a'}
                                    href={"#"}
                                    color={'primary'}
                                    underline={'none'}
                                >
                                    Login.
                                </Link>
                            </Typography>
                        </Box>
                        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
                            Sign Up <Icon icon={'ep:arrow-right-bold'} />
                        </LoadingButton>
                    </Box>
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    justifyContent={'flex-start'}
                    alignItems={'center'}
                >
                    <Typography
                        variant={'subtitle2'}
                        color={'text.secondary'}
                    >
                        By clicking "Sign up" button you agree with our{' '}
                        <Link
                            component={'a'}
                            color={'primary'}
                            href={'/login'}
                            underline={'none'}
                        >
                            company terms and conditions.
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </FormProvider>
    </Box>;
}
