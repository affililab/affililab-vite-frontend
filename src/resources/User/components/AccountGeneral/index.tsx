import {FC, useCallback} from "react";
import {
    Yup,
    useSnackbar,
    useForm,
    yupResolver,
    Box,
    Grid,
    Card,
    Stack,
    Typography,
    LoadingButton,
    useAuth,
    fData,
    FormProvider,
    RHFSwitch,
    RHFSelect,
    RHFTextField,
    RHFUploadAvatar,
    countries
} from "my-lib"
import {useMutation} from "@apollo/client";
import { UPDATE_PROFILE } from "@schemas/user"
import {partnerProgramsBackend} from "@config";

export const AccountGeneral: FC<any> = () => {
    const {enqueueSnackbar} = useSnackbar();

    const [saveProfileData, {error}] = useMutation(UPDATE_PROFILE);

    const {user} = useAuth();

    const UpdateUserSchema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        avatar: Yup.object().nullable(),
        about: Yup.string()
    });

    const defaultValues = {
        name: user?.name || '',
        email: user?.email || '',
        avatar: user?.avatar ? partnerProgramsBackend.filesEndpoint + user.avatar : '',
        about: user?.about || ''
    };

    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });

    const {
        setValue,
        watch,
        handleSubmit,
        formState: {isSubmitting},
    } = methods;

    const values = watch();

    const onSubmit = async () => {

        if (typeof values.avatar !== "object") delete values.avatar;

        try {
            await saveProfileData({variables: {...values}});
            enqueueSnackbar('Update success!');
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            if (file) {
                setValue(
                    'avatar',
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                );
            }
        },
        [setValue]
    );

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card sx={{py: 10, px: 3, textAlign: 'center'}}>
                        <RHFUploadAvatar
                            name="avatar"
                            accept="image/*"
                            maxSize={3145728}
                            onDrop={handleDrop}
                            helperText={
                                <Typography
                                    variant="caption"
                                    sx={{
                                        mt: 2,
                                        mx: 'auto',
                                        display: 'block',
                                        textAlign: 'center',
                                        color: 'text.secondary',
                                    }}
                                >
                                    Allowed *.jpeg, *.jpg, *.png, *.gif
                                    <br/> max size of {fData(3145728)}
                                </Typography>
                            }
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card sx={{p: 3}}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 3,
                                columnGap: 2,
                                gridTemplateColumns: {xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)'},
                            }}
                        >
                            <RHFTextField name="name" label="Name"/>
                            <RHFTextField name="email" label="Email Address"/>
                        </Box>

                        <Stack spacing={3} alignItems="flex-end" sx={{mt: 3}}>
                            <RHFTextField name="about" multiline rows={4} label="About"/>

                            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                Save Changes
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
