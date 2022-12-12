import {FC} from "react";
import {Card, FormProvider, LoadingButton, RHFTextField, Stack, useForm, useSnackbar, Yup, yupResolver} from "my-lib"
import {UPDATE_PROFILE} from "@schemas/user"
import {useMutation} from "@apollo/client";

export const PasswordReset: FC<any> = () => {
    const { enqueueSnackbar } = useSnackbar();

    const [saveProfileData, {error}] = useMutation(UPDATE_PROFILE);

    const ChangePassWordSchema = Yup.object().shape({
        oldPassword: Yup.string().required('Old Password is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const defaultValues = {
        oldPassword: '',
        password: '',
        passwordConfirmation: '',
    };

    const methods = useForm({
        resolver: yupResolver(ChangePassWordSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    const onSubmit = async () => {
        try {
            await saveProfileData({variables: {...values}});
            reset();
            enqueueSnackbar('Update success!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Card sx={{ p: 3 }}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={3} alignItems="flex-end">
                    <RHFTextField name="oldPassword" type="password" label="Old Password" />

                    <RHFTextField name="password" type="password" label="New Password" />

                    <RHFTextField name="passwordConfirmation" type="password" label="Confirm New Password" />

                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Save Changes
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </Card>
    );
}
