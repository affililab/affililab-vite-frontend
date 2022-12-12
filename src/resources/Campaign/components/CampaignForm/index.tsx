import React, {useMemo, useEffect, FC} from "react";
import {
    Stack,
    Box,
    RHFTextField,
    useSnackbar,
    useForm,
    FormProvider,
    Yup,
    yupResolver,
    LoadingButton, Alert
} from "my-lib";
import {useMutation} from "@apollo/client";
import {CREATE_CAMPAIGN, UPDATE_CAMPAIGN, GET_CAMPAIGNS} from "@schemas"

export const CampaignNewForm: FC<any> = ({isEdit, currentCampaign, onFinish}) => {

    const [saveCampaignMutation, { error }] = useMutation(isEdit ? UPDATE_CAMPAIGN : CREATE_CAMPAIGN, {
        refetchQueries: [
            { query: GET_CAMPAIGNS }
        ]
    });

    const {enqueueSnackbar} = useSnackbar();

    const NewCampaignSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string()
    });

    const defaultValues = useMemo(
        () => ({
            title: currentCampaign?.title || '',
            description: currentCampaign?.description || ''
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentCampaign]
    );

    const formMethods = useForm({
        resolver: yupResolver(NewCampaignSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        setError,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = formMethods;

    const values = watch();

    useEffect(() => {
        if (isEdit && currentCampaign) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentCampaign]);

    const onSubmit = async (data) => {
        try {
            let meta = {};
            if (isEdit) meta.id = currentCampaign.id;
            const response = await saveCampaignMutation({ variables: { ...meta, ...data } });

            enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');

            reset();
            onFinish();
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        if (error) {
            error.graphQLErrors.forEach(error => {
                // setError("afterSubmit", { type: 'custom', message: error.message });
                error?.extensions?.validationErrors.forEach(validationError => {
                 setError(validationError.path[0], {type: 'required', message: validationError.message})
                })
            })
        }
    }, [error]);

    return (
        <FormProvider methods={formMethods} onSubmit={handleSubmit(onSubmit)}>
            <Box px={4}>
                <Stack spacing={3} mb={2}>
                     {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                    <RHFTextField name="title" label="title"/>
                    <RHFTextField name="description" label="Description" multiline rows={3} />
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        {!isEdit ? 'Create Campaign' : 'Save Changes'}
                    </LoadingButton>
                </Stack>
            </Box>
        </FormProvider>
    )
}
