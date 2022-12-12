import React, {FC, useCallback, useEffect, useMemo, useState} from "react";
import {
    Autocomplete,
    Box,
    Chip,
    Controller,
    FormProvider,
    Image,
    LoadingButton,
    RHFEditor,
    RHFSwitch,
    RHFTextField,
    RHFUploadMultiFile,
    Stack,
    TextField,
    useForm,
    useSnackbar,
    Yup,
    yupResolver,
} from "my-lib";
import {useMutation, useQuery} from "@apollo/client";
import {CREATE_TOOL, UPDATE_TOOL} from "@schemas/tools";
import {GET_CATEGORIES} from "@schemas/category";

export const Form: FC<any> = ({refetchingOptions = {}, isEdit, item, finishCallBack}) => {

    const [saveItemMutation, { error }] = useMutation(isEdit ? UPDATE_TOOL : CREATE_TOOL, {
        refetchQueries: refetchingOptions
    });

    const {refetch, loading, error: categoriesError, data: categoriesData, called, networkStatus} = useQuery(GET_CATEGORIES);

    const [itemValue, setItemValue] = useState(item);

    const {enqueueSnackbar} = useSnackbar();

    const itemSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        link: Yup.string().required('Link is required'),
        cover: Yup.mixed(),
        images: Yup.mixed(),
        description: Yup.string(),
        categories: Yup.array().of(Yup.string()),
        tags: Yup.array().of(Yup.string()),
        approved: Yup.boolean(),
        shortDescription: Yup.string()
    });

    useEffect(() => {
        setItemValue(item);
    }, [item]);

    const defaultValues = useMemo(
        () => ({
            title: item?.title || '',
            cover: null,
            images: [],
            link: item?.link || '',
            categories: item?.categories?.map(item => item.id) ?? [],
            tags: [],
            approved: !!item?.approved,
            description: item?.description || '',
            shortDescription: item?.shortDescription || '',
        }),
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
        control,
        setValue,
        handleSubmit,
        formState: {isSubmitting},
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

        try {
            await saveItemMutation({variables: {...meta, ...Object.entries(data).reduce((a,[k,v]) => (v == null ? a : (a[k]=v, a)), {})}});
            reset();
            enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
            finishCallBack();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDrop = useCallback(
        (acceptedFiles) => {
            setValue(
                'images',
                [...values.images, ...acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )]
            );
        },
        [setValue, values]
    );

    const handleRemoveAll = () => {
        setValue('images', []);
    };

    const handleRemove = (file) => {
        const filteredItems = values.images?.filter((_file) => _file !== file);
        setValue('images', filteredItems);
    };

    const handleSelect = (file) => {
        const tempCover = values.cover;
        const cover = values.images?.find((_file) => _file === file);
        setValue('cover', cover);
        const coverMapped = values.images?.filter((_file) => _file !== file  );
        setValue('images', tempCover ? [...coverMapped, tempCover] : coverMapped);
    }

    return (
        <FormProvider methods={formMethods} onSubmit={handleSubmit(onSubmit)}>
            <Box px={4}>
                <Stack spacing={3} mb={2}>
                    { (values.cover) && <Image src={values?.cover.preview} sx={{maxHeight: "214px"}}/> }
                    <RHFUploadMultiFile
                                        name="images"
                                        accept="image/*"
                                        showPreview
                                        maxSize={3145728}
                                        onDrop={handleDrop}
                                        onSetCover={handleSelect}
                                        onRemove={handleRemove}
                                        onRemoveAll={handleRemoveAll} />
                    <RHFTextField name="link" label="link"/>
                    <RHFTextField name="title" label="title"/>
                    <RHFEditor name="description" label="Description" />
                    <RHFTextField name="shortDescription" label="Short Description" multiline rows={3} />
                    <RHFSwitch name="approved" label="approved" />
                    <Controller
                        name="categories"
                        control={control}
                        render={({ field }) => (
                            <Autocomplete
                                {...field}
                                multiple
                                freeSolo
                                getOptionLabel={(option) =>  categoriesData?.getCategories?.find(item => item.id === option).title}
                                onChange={(event, newValue) => field.onChange(newValue.filter(valueItem => categoriesData?.getCategories?.find(item => item.id === valueItem)))}
                                options={categoriesData?.getCategories?.map(item => item.id) ?? []}
                                renderInput={(params) => <TextField {...params} size="small" label={"categories"} placeholder={"choose categories"}/> }
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => {
                                        const valueItem = categoriesData?.getCategories?.find(item => item.id === option)
                                        return (
                                            <Chip {...getTagProps({ index })} key={valueItem?.id} size="small" label={valueItem?.title} />
                                        )
                                    })
                                }
                            />
                        )}
                    />
                    {/*<Controller*/}
                    {/*    name="tags"*/}
                    {/*    control={control}*/}
                    {/*    render={({ field }) => (*/}
                    {/*        <Autocomplete*/}
                    {/*            {...field}*/}
                    {/*            multiple*/}
                    {/*            freeSolo*/}
                    {/*            onChange={(event, newValue) => field.onChange(newValue)}*/}
                    {/*            options={[].map((option) => option)}*/}
                    {/*            renderTags={(value, getTagProps) =>*/}
                    {/*                value.map((option, index) => (*/}
                    {/*                    <Chip {...getTagProps({ index })} key={option} size="small" label={"hey"} />*/}
                    {/*                ))*/}
                    {/*            }*/}
                    {/*            renderInput={(params) => <TextField label="Tags" {...params} />}*/}
                    {/*        />*/}
                    {/*    )}*/}
                    {/*/>*/}
                </Stack>
                <LoadingButton sx={{ float: "right" }} type="submit" variant="contained" loading={isSubmitting}>
                    Save
                </LoadingButton>
            </Box>
        </FormProvider>
    )
}
