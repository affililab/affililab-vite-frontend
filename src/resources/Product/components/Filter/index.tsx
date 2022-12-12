import React, {useState} from "react";
import {Box, Grid, Icon, Scrollbar, Tab, Tabs, useTheme} from "my-lib";
import {capitalCase} from "change-case";
import FilterList from "./List";
import {ApplyList} from "@resources/SavedFilter/components/ApplyList";

export const Filter = ({height, filtersList, filter, setFilter, applyFilter, embedded}) => {

    const handleChange = (event, key, newValue, committed = true) => {
        setFilter(filter.map(filterValue => key === filterValue.key ? {...filterValue, value: newValue} : filterValue));
    };

    const handleChangeEmptyShow = (event, key, newValue) => {

        setFilter(filter.map(filterValue => key === filterValue.key ? {
            ...filterValue,
            showEmpty: newValue
        } : filterValue));
    };

    const theme = useTheme();

    // tabs
    const [currentTab, setCurrentTab] = useState('Finanzen');

    // tabs
    const FILTER_TABS = [
        {
            value: 'Saved Filters',
            icon: <Icon icon={'fa-regular:save'} width={20} height={20}/>,
            full: true,
            component: <ApplyList applyFilter={(filter) => { setFilter(filter); setCurrentTab(FILTER_TABS[1].value);  }} />
        },
        {
            value: 'Finanzen',
            icon: <Icon icon={'mdi:finance'} width={20} height={20}/>,
            component: <FilterList filters={filtersList.slice(0, 3)} values={filter} handleFilter={handleChange}
                                   handleChangeEmptyShow={handleChangeEmptyShow}/>
        },
        {
            value: 'Performance',
            icon: <Icon icon={'charm:chart-line'} width={20} height={20}/>,
            component: <FilterList filters={filtersList.slice(3, 7)} values={filter} handleFilter={handleChange}
                                   handleChangeEmptyShow={handleChangeEmptyShow}/>
        },
        {
            value: 'Kategorien',
            icon: <Icon icon={'carbon:collapse-categories'} width={20} height={20}/>,
            component: <FilterList filters={filtersList.slice(7, 13)} values={filter} handleFilter={handleChange}
                                   handleChangeEmptyShow={handleChangeEmptyShow}/>
        }
    ];

    if (!filter.length) return <></>

    return<Box sx={(theme) => ({ border: embedded ? `solid 1px ${theme.palette.divider}` : "" , width: "100%" })}>
        <Tabs
            sx={{ px: 2, boxShadow: theme.customShadows.z12, }}
            value={currentTab}
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
            onChange={(e, value) => setCurrentTab(value)}>
            {FILTER_TABS.map((tab, index) => (
                <Tab disableRipple key={index} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value}/>
            ))}
        </Tabs>

        <Box p={FILTER_TABS.find((tab) => tab.value === currentTab)?.full ? 0 : 4} sx={{ height: height ?? "512px", overflow: "hidden", background: theme.palette.background.neutral }}>
            {FILTER_TABS.find((tab) => tab.value === currentTab)?.full  ? <Box sx={{m: 0}}>
                    <Grid container direction="column" spacing={4}>{FILTER_TABS.find((tab) => tab.value === currentTab)?.component}</Grid>
                </Box> : <Scrollbar>
                <Box sx={{m: 4}}>
                    <Grid container direction="column" spacing={4}>{FILTER_TABS.find((tab) => tab.value === currentTab)?.component}</Grid>
                </Box>
            </Scrollbar>}
        </Box></Box>
};
