import React, {useEffect, useMemo, useState} from "react";
import {
    Box,
    Button,
    FormProvider,
    Icon,
    LoadingButton,
    Scrollbar,
    Stack,
    useForm,
    useSnackbar,
    Yup,
    yupResolver
} from "my-lib";
import {useMutation} from "@apollo/client";
import {FormFieldMapper} from "@components/FormFieldMapper"

export const EditCreateForm = ({
                                   refetchingOptions = {},
                                   abort = {},
                                   isEdit,
                                   item,
                                   finishCallBack,
                                   editMutation,
                                   createMutation,
                                   resourceSchema = []
                               }) => {

    const [saveItemMutation, {error}] = useMutation(isEdit ? editMutation : createMutation, {
        refetchQueries: refetchingOptions
    });

    const [itemValue, setItemValue] = useState(item);

    const {enqueueSnackbar} = useSnackbar();

    const itemSchema = Yup.object().shape(Object.fromEntries(resourceSchema.map(item => ([item.key, item.formConfig.validation]))));

    useEffect(() => {
        setItemValue(item);
    }, [item]);

    const defaultValues = useMemo(
        () => (
            Object.fromEntries(resourceSchema.map(resourceSchemaItem => {
                let {defaultValue} = resourceSchemaItem.formConfig;
                if (item && !["images"].includes(resourceSchemaItem.formConfig.type)) {
                    defaultValue = ["categories", "relation"].includes(resourceSchemaItem.formConfig.type) ? item[resourceSchemaItem.key].map(({id}) => id) : item[resourceSchemaItem.key]
                    if (resourceSchemaItem.formConfig.type === "relationSingle") defaultValue = item[resourceSchemaItem.key]?.id;
                }
                if (resourceSchemaItem.formConfig.type === "switch") defaultValue = defaultValue ?? false;
                return [resourceSchemaItem.key, defaultValue]
            }))
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [itemValue]
    );

    const formMethods = useForm({
        resolver: yupResolver(itemSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        handleSubmit,
        formState: {isSubmitting, errors},
    } = formMethods;

    const values = watch();

    useEffect(() => {
        if (isEdit && item) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, item]);


    const onSubmit = async (data) => {
        let meta = {};
        if (isEdit) meta.id = item.id;

        // delete image when it is not replaced by new upload
        resourceSchema.filter(({formConfig}) => formConfig.type === "image").forEach(item => {
            if (typeof values[item.key] !== "object") delete values[item.key];
        });

        try {
            await saveItemMutation({variables: {...meta, ...values}});
            reset();
            enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
            finishCallBack();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FormProvider sx={{overflow: "hidden"}} methods={formMethods} onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{height: "70vh", background: (theme) => theme.palette.background.neutral}}>
                <Scrollbar>
                <Box sx={{p: 4}}>
                    <Stack spacing={3} mb={2}>
                        {resourceSchema.filter(({formConfig}) => formConfig.visibility !== "hidden").map(({
                                                                                                              formConfig,
                                                                                                              key
                                                                                                          }) => <Box key={key}>{FormFieldMapper(formConfig.type, {name: key, ...formConfig.fieldConfig}, formMethods)}</Box>)}
                    </Stack>
                </Box>
            </Scrollbar>
        </Box>
    <Box sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        p: 2,
        boxShadow: (theme) => theme.customShadows.z12,
    }}>
        <Box sx={{
            justifySelf: "flex-end",
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            gap: (theme) => theme.spacing(2)
        }}>
            <Button size={'large'} color={'inherit'} variant="" onClick={() => {
                abort()
            }}>
                cancel
            </Button>
            <LoadingButton sx={{float: "right"}} type="submit" variant="contained" loading={isSubmitting}>
                <Icon sx={{mr: 2}} width={18}
                      height={18}
                      icon={'fa-regular:save'}/>
                Save
            </LoadingButton>
        </Box>
    </Box>
</FormProvider>
)
}
