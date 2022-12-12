import React from "react";
import {
    Stack,
    Item,
    Slider,
    Box,
    Typography,
    Grid,
    Autocomplete,
    TextField,
    Rating,
    OutlinedInput,
    InputAdornment,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Switch, Divider
} from "my-lib";

function valuetext(value) {
    return `${value} €`;
}

function valuePrice(value) {
    return value > 0 ? `${value}€` : value;
}

function valuePercent(value) {
    return `${value}%`;
}

function valueNumber(value) {
    return value;
}

const getValue = (filter, values) => values.find(value => value.key === filter.key).value;

const getShowEmptyValue = (filter, values) => values.find(value => value.key === filter.key).showEmpty;

function getDisplayValue(filter, values, valueIndex) {
    const displayValueMapper = {
        percent: valuePercent,
        price: valuePrice,
        number: valueNumber
    };
    const value = getValue(filter, values)[valueIndex];
    return displayValueMapper[filter.settings.type](value);
}

const valueTextMapper = {
    percent: (value) => {
        return `${value} %`;
    },
    price: (value) => {
        return `${value} €`;
    },
    number: (value) => {
        return `${value}`;
    },
};

const MultiselectComponent = (filter, values, handleFilter, handleChangeEmptyShow, params) => {

    return <Grid direction={"column"} container spacing={2}><Autocomplete
        multiple
        limitTags={2}
        size="small"
        id="multiple-limit-tags"
        options={filter.settings.options}
        getOptionLabel={(option) => option.title}
        defaultValue={[]}
        value={filter.settings.options.filter(optionItem => getValue(filter, values).includes(optionItem.id))}
        onChange={(event, val) => {
            handleFilter(event, filter.key, val.map(item => item.id))
        }}
        renderInput={(params) => (
            <TextField {...params} size="small" label={filter.title} placeholder={filter.title}/>
        )}
    />
        <FormControlLabel labelPlacement="start" control={<Switch sx={{margin: 2}} onChange={(event, val) => {
            handleChangeEmptyShow(event, filter.key, val)
        }} size="small" defaultChecked={getShowEmptyValue(filter, values)} />} label="Produkte ohne den Wert anzeigen"/>
    </Grid>
}

const OptionsComponent = (filter, values, handleFilter, params) => {
    return <FormControl>
        <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={filter.value}
            name="radio-buttons-group"
            onChange={(event, val) => {
                handleFilter(event, filter.key, parseInt(val))
            }}
        >
            {filter.settings.options.map(filterOption => <FormControlLabel value={filterOption.value} control={<Radio/>}
                                                                           label={filterOption.title}/>)}
        </RadioGroup>
    </FormControl>
}

const _getStep = (val) => {
    const stepsMapping = [[10, 1], [100, 10], [1000, 10], [10000, 100], [100000, 10000], [1000000, 100000]];
    let step = 0;
    let i = 0;
    do {
        step = stepsMapping[i][1];
        i += 1;
    } while (stepsMapping[i][0] <= val);
    return step;
};

const SliderComponent = (filter, values, handleFilter, handleChangeEmptyShow) => {

    const suffixMapper = {
        percent: "%",
        price: "€",
        number: ""
    };

    const isInputValid = (first = true, val) => {
        if (first) {
            return val >= filter.settings.min && val <= getValue(filter, values)[1];
        }
        return val >= getValue(filter, values)[0] && val <= filter.settings.max;
    };

    return <>
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                width: '100%',
                borderRadius: 1
            }}
        >
            <OutlinedInput
                size="small"
                variant="outlined"
                type="number"
                sx={{maxWidth: "100px", height: "32px"}}
                startAdornment={<InputAdornment
                position="start">{suffixMapper[filter.settings.type]}</InputAdornment>}
                onChange={(e) => {
                    if (isInputValid(true, e.target.value)) handleFilter(e, filter.key, [parseFloat(e.target.value), getValue(filter, values)[1]], true);
                }} value={getValue(filter, values)[0]}/>
            {/* {getDisplayValue(filter, values, 0)} */}
            <OutlinedInput
                size="small"
                variant="outlined"
                type="number"
                sx={{width: "100px", height: "32px"}}
                startAdornment={<InputAdornment
                    position="start">{suffixMapper[filter.settings.type]}</InputAdornment>}
                onChange={(e) => {
                    if (isInputValid(false, e.target.value)) handleFilter(e, filter.key, [getValue(filter, values)[0], parseFloat(e.target.value)], true);
                }} value={getValue(filter, values)[1]}/>
            {/* {getDisplayValue(filter, values, 1)} */}
        </Box>
        <Slider
            value={getValue(filter, values)}
            onChange={(event, newValue) => {
                handleFilter(event, filter.key, newValue, false);
            }}
            onChangeCommitted={(event, newValue) => {
                handleFilter(event, filter.key, newValue, true);
            }}
            min={filter.settings.min}
            max={filter.settings.max}
            step={_getStep(filter.settings.max)}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            valueLabelFormat={valueTextMapper[filter.settings.type]}
        />
        <FormControlLabel labelPlacement="start" control={<Switch sx={{marginLeft: 2}} onChange={(event, val) => {
            handleChangeEmptyShow(event, filter.key, val)
        }} size="small" checked={getShowEmptyValue(filter, values)}/>} label="Produkte ohne den Wert anzeigen"/>
    </>
};

const RatingComponent = (filter, values, handleFilter, handleChangeEmptyShow) => {
    return <Rating
        name="simple-controlled"
        value={getValue(filter, values)}
        onChange={(event, newValue) => {
            handleFilter(event, filter.key, newValue, false)
        }}
        onChangeCommitted={(event, newValue) => {
            handleFilter(event, filter.key, newValue, true)
        }}
    />
};

const filterComponentMapper = {
    range: SliderComponent,
    category: MultiselectComponent,
    rating: RatingComponent,
    options: OptionsComponent
};

export const FilterList = ({filters, handleFilter, handleChangeEmptyShow, values}) => {
    return filters.map((filter, index) => <Stack sx={{width: "100%", p: 4}} key={index}>
        <Box>
            {filter.settings.showTitle !== false &&
                <Typography variant="caption" color="textSecondary" component="p">{filter.title}</Typography>}
        </Box>
        <Box>
            {filterComponentMapper[filter.type](filter, values, handleFilter, handleChangeEmptyShow)}
        </Box>
        <Divider component="span" sx={{m: 2}}/>
    </Stack>)
};

export default FilterList;