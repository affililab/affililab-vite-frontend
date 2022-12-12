import React, {FC, useState} from 'react';
import * as Yup from 'yup';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {
    Grid,
    Typography,
    FormProvider,
    RHFCheckbox,
    RHFTextField,
    useAuth,
    useIsMountedRef,
    Box,
    Icon,
    InputAdornment,
    Link,
    LoadingButton,
    IconButton
} from 'my-lib'

type LoginFormProps = {
  handleCloseModal: () => void;
  openRegister: () => void;
};

export const LoginForm : FC<LoginFormProps> = ({ handleCloseModal = () => {}, openRegister = () => {} }) => {
    const { login } = useAuth();

    const isMountedRef = useIsMountedRef();

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Email must be a valid email address').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        email: '',
        password: '',
        remember: true,
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } : any = methods;

    const onSubmit = async (data : { email: string, password: string }) => {
        try {
            await login(data.email, data.password);
            handleCloseModal();
        } catch (error) {
            console.error(error);
            reset();
            if (isMountedRef.current) {
                setError('afterSubmit', error);
            }
        }
    };

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                        Enter your email
                    </Typography>
                    <RHFTextField name="email" label="Email address" />
                </Grid>
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        alignItems={{ xs: 'stretched', sm: 'center' }}
                        justifyContent={'space-between'}
                        width={1}
                        marginBottom={2}
                    >
                        <Box marginBottom={{ xs: 1, sm: 0 }}>
                            <Typography variant={'subtitle2'}>
                                Enter your password
                            </Typography>
                        </Box>
                        <Typography variant={'subtitle2'}>
                            <Link
                                component={'a'}
                                color={'primary'}
                                href={'/password-reset-simple'}
                                underline={'none'}
                            >
                                Forgot your password?
                            </Link>
                        </Typography>
                    </Box>
                    <RHFTextField
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                        <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <RHFCheckbox name="remember" label="Remember me" />
                </Grid>
                <Grid item container xs={12}>
                    <Box
                        display="flex"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        alignItems={{ xs: 'stretched', sm: 'center' }}
                        justifyContent={'space-between'}
                        width={1}
                        maxWidth={600}
                        margin={'0 auto'}
                    >
                        <Box marginBottom={{ xs: 1, sm: 0 }}>
                            <Typography variant={'subtitle2'}>
                                Don't have an account yet?{' '}
                                <Link
                                    onClick={ (e) => { e.preventDefault(); openRegister() } }
                                    component={'a'}
                                    href={"#"}
                                    color={'primary'}
                                    underline={'none'}
                                >
                                    Sign up here.
                                </Link>
                            </Typography>
                        </Box>
                        <LoadingButton size="large" type="submit" variant="contained" loading={isSubmitting}>
                            Login <Icon icon={'ep:arrow-right-bold'} />
                        </LoadingButton>
                    </Box>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
