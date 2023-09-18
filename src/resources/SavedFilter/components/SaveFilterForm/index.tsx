import React, {FC, useEffect, useMemo, useState} from "react";
import {
    Box,
    FormProvider,
    LoadingButton,
    RHFSwitch,
    RHFTextField, Scrollbar,
    Stack,
    useForm,
    useSnackbar,
    Yup,
    yupResolver
} from "my-lib";
import {useSaveFilter} from "@resources/SavedFilter/hooks/useSaveFilter";
import {Filter} from "@resources/Product/components/Filter";

export const SaveFilterForm: FC<any> = ({isEdit, item, searchValue, filterSettings, currentSaveFilterSchema, finishCallBack}) => {

    const [saveFilterMutation, {error, loading}] = useSaveFilter(isEdit);
    const [filterValues, setFilterValues] = useState(currentSaveFilterSchema);

    const {enqueueSnackbar} = useSnackbar();

    useEffect(() => {
        setFilterValues(currentSaveFilterSchema);
    }, [currentSaveFilterSchema]);

    const SaveFilterSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string(),
        searchValue: Yup.string(),
        searchprofile: Yup.boolean(),
        include_search: Yup.boolean()
    });

    const defaultValues = useMemo(
        () => ({
            title: item?.title || '',
            description: item?.description || '',
            searchValue: searchValue || '',
            searchprofile: false,
            include_search: true
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [currentSaveFilterSchema, searchValue]
    );

    const formMethods = useForm({
        resolver: yupResolver(SaveFilterSchema),
        defaultValues,
    });

    const {
        reset,
        watch,
        control,
        setValue,
        handleSubmit,
        formState: {isSubmitting},
    } = formMethods;

    const values = watch();

    useEffect(() => {
        if (isEdit && currentSaveFilterSchema) {
            reset(defaultValues);
        }
        if (!isEdit) {
            reset(defaultValues);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit, currentSaveFilterSchema]);


    const onSubmit = async (data) => {

        const filterFormValues = {}
        filterValues.forEach(({key, showEmpty, value}) => filterFormValues[key] = {
            showEmpty,
            value
        });
        const {include_search, searchprofile, ...restData} = data;
        let meta = restData;
        if (isEdit) meta.id = item.id;

        if (data.include_search) meta.searchValue = searchValue;

        try {
            await saveFilterMutation({variables: {...meta, ...filterFormValues}});
            reset();
            enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
            finishCallBack();
            // navigate(PATH_DASHBOARD.user.list);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box>
            <FormProvider methods={formMethods} onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{height: "724px", background: (theme) => theme.palette.background.neutral}}>
                    <Scrollbar>
                        <Box sx={{ p: 4 }}>
                            <Stack spacing={3} mb={2}>
                                <RHFTextField name="title" label="title"/>
                                <RHFTextField name="description" label="Description" multiline rows={3}/>
                                <RHFTextField name="searchValue" label="Suchbegriff" />
                                <RHFSwitch name="searchprofile" label="bei neuen Partnerprogrammen benachrichtigt werden"/>
                                { !isEdit && <RHFSwitch name="include_search" label="Suchbegriff mit speichern"/> }
                                {/* filter settings */}
                                <Filter embedded height={"256px"} filtersList={filterSettings} filter={filterValues}
                                        setFilter={setFilterValues}/>
                            </Stack>
                        </Box>
                    </Scrollbar>
                </Box>
                <Box>
                    <LoadingButton size={'large'} sx={{ float: "right", m: 2 }} type="submit" variant="contained" loading={isSubmitting}>
                        Save Filter
                    </LoadingButton>
                </Box>
            </FormProvider>
        </Box>
    )
};
