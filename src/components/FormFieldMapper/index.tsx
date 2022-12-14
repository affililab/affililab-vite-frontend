import React, {FC, useCallback, useEffect, useState} from "react";

import {
    RHFEditor,
    RHFTextField,
    RHFSwitch,
    Image,
    RHFUploadMultiFile,
    RHFUploadSingleFile,
    Autocomplete,
    TextField,
    Chip,
    Controller,
    DatePicker,
    Typography,
    fData,
    RHFUploadAvatar,
    InputAdornment,
    IconButton,
    Icon,
    Switch,
    Box, FormControlLabel
} from "my-lib";
import {useQuery} from "@apollo/client";
import {partnerProgramsBackend} from "@config";

export const FormFieldMapper: FC<any> = (type, fieldConfig, formMethods) => {

    const {
        watch,
        control,
        setValue,
    } = formMethods;

    const values = watch();

    const TextFieldRenderer = ({name, label, multiline = false, rows = 3}) => <RHFTextField name={name} label={label}
                                                                                            multiline={multiline}
                                                                                            rows={rows} />

    const EditorRenderer = ({name, label}) => <RHFEditor name={name} label={label}/>

    const SwitchRenderer = ({name, label}) => <RHFSwitch name={name} label={label}/>

    const ImagesRenderer = ({name, label}) => {

        const handleDrop = useCallback(
            (acceptedFiles) => {
                setValue(
                    name,
                    [...values[name], ...acceptedFiles.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    )]
                );
            },
            [setValue, values]
        );

        const handleRemoveAll = () => {
            setValue(name, []);
        };

        const handleRemove = (file) => {
            const filteredItems = values[name]?.filter((_file) => _file !== file);
            setValue(name, filteredItems);
        };

        const handleSelect = (file) => {
            const tempCover = typeof values.cover !== "string" ? values.cover : null;
            const cover = values[name]?.find((_file) => _file === file);
            setValue('cover', cover);
            const coverMapped = values[name]?.filter((_file) => _file !== file);
            setValue(name, tempCover ? [...coverMapped, tempCover] : coverMapped);
        }

        return <>
            {(values.cover) && <Image
                src={typeof values?.cover === "string" ? (values[name].includes("http") ? value : partnerProgramsBackend.filesEndpoint + values.cover) : values?.cover.preview}
                sx={{maxHeight: "214px"}}/>}
            {(values.productImg) && <Image
                src={typeof values?.productImg === "string" ? (values[name].includes("http") ? value : partnerProgramsBackend.filesEndpoint + values.productImg) : values?.productImg.preview}
                sx={{maxHeight: "214px"}}/>}
            <RHFUploadMultiFile
                name={name}
                accept="image/*"
                showPreview
                maxSize={3145728}
                onDrop={handleDrop}
                onSetCover={handleSelect}
                onRemove={handleRemove}
                onRemoveAll={handleRemoveAll}/>
        </>
    }

    const AvatarRenderer = ({name, label}) => {

        const handleDrop = useCallback(
            (acceptedFiles) => {
                const file = acceptedFiles[0];

                if (file) {
                    setValue(
                        name,
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    );
                }
            },
            [setValue]
        );

        return <>
            {(typeof values[name] === "string" && !values[name].includes("http")) && <Image
                disabledEffect
                sx={{maxHeight: "214px"}}
                src={partnerProgramsBackend.filesEndpoint + values[name]}
            />}
            <RHFUploadAvatar
                name={name}
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
        </>
    }

    const ImageRenderer = ({name, label}) => {

        const handleDrop = useCallback(
            (acceptedFiles) => {
                const file = acceptedFiles[0];

                if (file) {
                    setValue(
                        name,
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    );
                }
            },
            [setValue]
        );

        return <>
            {(typeof values[name] === "string" && !values[name].includes("http")) && <Image
                disabledEffect
                sx={{maxHeight: "214px"}}
                src={partnerProgramsBackend.filesEndpoint + values[name]}
            />}
            <RHFUploadSingleFile name={name} accept="image/*" maxSize={3145728} onDrop={handleDrop}/>
        </>
    }

    const CategoryRenderer = ({name, label, optionsQuery, placeholder = "choose items ..."}) => {

        const {data} = useQuery(optionsQuery);

        const [options, setOptions] = useState([]);

        useEffect(() => {
            data && setOptions(data.getAllCategories);
        }, [data]);

        // return <></>

        return <Controller
            name={name}
            control={control}
            render={({field}) => (
                <Autocomplete
                    {...field}
                    multiple
                    freeSolo
                    getOptionLabel={(option) => options?.find(item => item?.id === option).title}
                    onChange={(event, newValue) => field.onChange(newValue.filter(valueItem => options?.find(item => item.id === valueItem)))}
                    options={options?.map(item => item?.id) ?? []}
                    renderInput={(params) => <TextField {...params} size="small" label={label}
                                                        placeholder={placeholder}/>}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                            const valueItem = options?.find(item => item.id === option)
                            return (
                                <Chip {...getTagProps({index})} key={valueItem?.id} size="small"
                                      label={valueItem?.title}/>
                            )
                        })
                    }
                />
            )}
        />
    }

    const RelationRenderer = ({name, label, optionsQuery, optionsQueryName, placeholder = "choose items ..."}) => {

        const {data} = useQuery(optionsQuery);

        const [options, setOptions] = useState([]);

        useEffect(() => {
            data && setOptions(data[optionsQueryName]);
        }, [data]);

        // return <></>

        return <Controller
            name={name}
            control={control}
            render={({field}) => (
                <Autocomplete
                    {...field}
                    multiple
                    freeSolo
                    getOptionLabel={(option) => options?.find(item => item?.id === option).title}
                    onChange={(event, newValue) => field.onChange(newValue.filter(valueItem => options?.find(item => item.id === valueItem)))}
                    options={options?.map(item => item?.id) ?? []}
                    renderInput={(params) => <TextField {...params} size="small" label={label}
                                                        placeholder={placeholder}/>}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => {
                            const valueItem = options?.find(item => item.id === option)
                            return (
                                <Chip {...getTagProps({index})} key={valueItem?.id} size="small"
                                      label={valueItem?.title}/>
                            )
                        })
                    }
                />
            )}
        />
    }

    const RelationSingleRenderer = ({name, label, optionsQuery, optionsQueryName, placeholder = "choose item ..."}) => {

        const {data} = useQuery(optionsQuery);

        const [options, setOptions] = useState([]);

        useEffect(() => {
            data && setOptions(data[optionsQueryName]);
        }, [data]);

        // return <></>

        return <Controller
            name={name}
            control={control}
            render={({field}) => (
                !!options.length && <Autocomplete
                    {...field}
                    freeSolo
                    getOptionLabel={(option) => options?.find(item => item?.id === option)?.title}
                    onChange={(event, newValue) => field.onChange(newValue)}
                    options={options?.map(item => item?.id) ?? []}
                    renderInput={(params) => <TextField {...params} size="small" label={label}
                                                        placeholder={placeholder}/>}
                    renderTags={(value, getTagProps) =>
                        <Chip {...getTagProps({index})} key={value?.id} size="small" label={value?.title}/>
                    }
                />
            )}
        />
    }

    const OptionsRenderer = ({name, label, options, placeholder = "choose item ..."}) => {

        // return <></>

        return <Controller
            name={name}
            control={control}
            render={({field}) => (
                <Autocomplete
                    {...field}
                    freeSolo
                    getOptionLabel={(option) => options[option]}
                    onChange={(event, newValue) => field.onChange(parseInt(newValue))}
                    options={Object.keys(options)}
                    renderInput={(params) => <TextField {...params} size="small" label={label}
                                                        placeholder={placeholder}/>}
                    renderTags={(value, getTagProps) =>
                        <Chip {...getTagProps({index})} key={value?.id} size="small" label={value?.title}/>
                    }
                />
            )}
        />
    }

    const DateRenderer = ({name, label}) => {
        return <DatePicker
            label={label}
            value={values[name]}
            onChange={(newValue) => {
                setValue(
                    name,
                    newValue
                );
            }}
            renderInput={(params) => <RHFTextField {...params} name={name} label={label} fullWidth margin="normal"
                                                   helperText={null}/>}
        />
    }

    const PasswordRenderer = (fieldConfig) => {

        const [showPassword, setShowPassword] = useState(false);

        return <RHFTextField
            {...fieldConfig}
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
    }

    const DynamicFieldRenderer = (fieldConfig) => {

        const defaultValuesLookup = {
            number: 0,
            switch: false,
            text: ''
        };

        const addItem = () => {
            setValue(fieldConfig.name, [...values[fieldConfig.name], Object.fromEntries(fieldConfig.elements.map(k => [k.key, ''])) ]);
        };

        const deleteItem = (index) => {
            setValue(fieldConfig.name, [...values[fieldConfig.name].slice(0,index), ...values[fieldConfig.name].slice(index+1)]);
        };

        useEffect(() => {
            if (values[fieldConfig.name]?.length) {
                setValue(fieldConfig.name, values[fieldConfig.name].map(item => {
                    let validItem = {};
                    fieldConfig.elements.forEach(elementItem => validItem[elementItem.key] = item[elementItem.key]);
                    return validItem;
                }));
                return;
            }
            setValue(fieldConfig.name, [Object.fromEntries(fieldConfig.elements.map(k => [k.key, defaultValuesLookup[k.type]]))]);
        }, []);

        return <Box sx={{display: "flex", flexDirection: "column", gap: (theme) => theme.spacing(2)}}>
            <Typography variant={"subtitle1"}>{fieldConfig.label}</Typography>
            <Box sx={{display: "flex", flexDirection: "column", gap: (theme) => theme.spacing(2)}}>
                <Controller
                    name={fieldConfig.name}
                    control={control}
                    render={ ({field}) => (<>
                        {values[fieldConfig.name].map((item, index) => <Box key={index} sx={{
                            display: "flex",
                            gap: (theme) => theme.spacing(2)
                        }}>
                            {fieldConfig.elements.map(element => {
                                switch(element.type) {
                                    case "text":
                                        return <TextField
                                            onChange={(e, newValue) => {
                                                setValue(fieldConfig.name, values[fieldConfig.name]?.map( (item, itemIndex) => itemIndex === index ? { ...item, [element.key] : e.target.value } : item));
                                            }}
                                            label={element.label}
                                            value={item[element.key]}
                                            name={element.key + index}
                                            type={"text"}
                                        />
                                        break;
                                    case "number":
                                        return <TextField
                                            onChange={(e, newValue) => {
                                                setValue(fieldConfig.name, values[fieldConfig.name]?.map( (item, itemIndex) => itemIndex === index ? { ...item, [element.key] : parseInt(e.target.value) } : item));
                                            }}
                                            label={element.label}
                                            value={item[element.key]}
                                            name={element.key + index}
                                            type={"number"}
                                        />
                                        break;
                                    case "switch":
                                        console.log("switch - item, item[element.key], ", item, item[element.key]);
                                        return <FormControlLabel
                                            labelPlacement="start"
                                            control={
                                                <Switch
                                                    sx={{margin: 2}}
                                                    size="small"
                                                    onChange={(e, newValue) => {
                                                        console.log("newValue", newValue);
                                                        setValue(fieldConfig.name, values[fieldConfig.name]?.map( (item, itemIndex) => itemIndex === index ? { ...item, [element.key] : newValue } : item));
                                                        console.log(values[fieldConfig.name]?.map( (item, itemIndex) => itemIndex === index ? { ...item, [element.key] : newValue } : item));
                                                    }}
                                                    defaultChecked={item[element.key] ? true : false}
                                                    name={element.key + index} />
                                            }
                                            label={element.label} />
                                        // return <TextField
                                        //     onChange={(e, newValue) => {
                                        //         setValue(fieldConfig.name, values[fieldConfig.name]?.map( (item, itemIndex) => itemIndex === index ? { ...item, [element.key] : e.target.value } : item));
                                        //     }}
                                        //     label={element.label}
                                        //     value={item[element.key]}
                                        //     name={element.key + index}
                                        //     type={"text"}
                                        // />
                                        break;
                                    default:
                                        return <TextField
                                            onChange={(e, newValue) => {
                                                setValue(fieldConfig.name, values[fieldConfig.name]?.map( (item, itemIndex) => itemIndex === index ? { ...item, [element.key] : e.target.value } : item));
                                            }}
                                            label={element.label}
                                            value={item[element.key]}
                                            name={element.key + index}
                                            type={"text"}
                                        />
                                }
                            })}
                            {!!index && <Box onClick={() => { deleteItem(index) }} sx={{ width: "52px", justifySelf: "center", alignSelf: "center" }}><IconButton aria-label="delete">
                                <Icon icon={"gala:remove"}/>
                            </IconButton></Box>}
                        </Box>)}</>)} />
            </Box>
            <Box onClick={() => {
                addItem()
            }} sx={{width: "52px", alignSelf: "flex-end"}}>
                <IconButton aria-label="add">
                    <Icon icon={"gala:add"}/>
                </IconButton>
            </Box>
        </Box>
    }

    const toFixedIfNecessary = ( value, dp ) => {
        return +parseFloat(value).toFixed( dp );
    }

    const CurrencyFieldRenderer = ({name, label}) => {
        return <RHFTextField
            type="number"
            name={name}
            label={label}
            defaultValue={0}
            InputLabelProps={{ placeholder: 0.00, shrink: true, step: ".01",  pattern: "^\d+(?:\.\d{1,2})?$"  }}
            onChange={(event) => {
                setValue(name, toFixedIfNecessary(event.target.value, 2));
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        €
                    </InputAdornment>
                ),
            }}
        />
    }

    const PercentageFieldRenderer = ({name, label}) => {
        return <RHFTextField
            type="number"
            name={name}
            label={label}
            defaultValue={0}
            InputLabelProps={{ shrink: true }}
            InputProps={{
                inputProps: { min: 0, max: 100 },
                startAdornment: (
                    <InputAdornment position="start">
                        %
                    </InputAdornment>
                ),
            }}
        />
    }

    const NumberFieldRenderer = ({name, label}) => {
        return <RHFTextField
            type="number"
            name={name}
            label={label}
            defaultValue={0}
            InputLabelProps={{ shrink: true }}
            InputProps={{
                inputProps: { min: 0, step: "any" },
            }}
        />
    }

    const formMappingObject = {
        textField: TextFieldRenderer,
        password: PasswordRenderer,
        editor: EditorRenderer,
        switch: SwitchRenderer,
        image: ImageRenderer,
        images: ImagesRenderer,
        categories: CategoryRenderer,
        relation: RelationRenderer,
        relationSingle: RelationSingleRenderer,
        date: DateRenderer,
        avatar: AvatarRenderer,
        options: OptionsRenderer,
        dynamic: DynamicFieldRenderer,
        currency: CurrencyFieldRenderer,
        percentage: PercentageFieldRenderer,
        number: NumberFieldRenderer,
    }

    if (!Object.keys(formMappingObject).includes(type)) return <></>

    return formMappingObject[type](fieldConfig)
}