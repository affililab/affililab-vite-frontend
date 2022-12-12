import React, {useState, useEffect} from "react"
import {
    Badge,
    Box,
    IconButton,
    Icon,
    InputAdornment,
    InputStyle,
    styled,
    Toolbar,
    Tooltip,
    Typography,
    useTheme
} from "my-lib";

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({theme}) => ({
    height: 28,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));

export const TableComponentToolbar = ({
                                           numSelected, disableFilter, activeFilterCount, selected, openFilter = () => {
    }, onSearch = () => {
    }, selectedToolbarItems = [], toolbarItems = []
                                      }) => {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        onSearch(searchValue);
    }, [searchValue]);

    return (
        <RootStyle
            sx={{
                background: theme.palette.background.paper,
                ...(numSelected > 0 && {
                    color: isLight ? 'primary.main' : 'text.primary',
                    bgcolor: isLight ? 'secondary.lighter' : 'secondary.dark',
                })
            }}
        >
            {!!(numSelected > 0) && (
                <Typography component="div" variant="subtitle2">
                    {numSelected} selected
                </Typography>
            )
            //     (
            //     <InputStyle
            //         stretchStart={240}
            //         size={"small"}
            //         value={searchValue}
            //         onChange={(event) => setSearchValue(event.target.value)}
            //         placeholder="Search ..."
            //         InputProps={{
            //             startAdornment: (
            //                 <InputAdornment position="start">
            //                     <Icon icon={'eva:search-fill'} sx={{color: 'text.disabled', width: 20, height: 20}}/>
            //                 </InputAdornment>
            //             ),
            //         }}
            //     />
            // )
            }
            <Box></Box>

            {numSelected > 0 ?
                <Box>{selectedToolbarItems.map((toolbarItem, index) => <Tooltip key={index} title={toolbarItem.title}>
                    <IconButton onClick={() => toolbarItem.onAction(selected)}>
                        <Icon icon={toolbarItem.icon}/>
                    </IconButton>
                </Tooltip>)}</Box> : toolbarItems.map((toolbarItem, index) => <Tooltip key={index} title={toolbarItem.title}>
                    {toolbarItem.element ?? <IconButton onClick={() => toolbarItem.onAction(selected)}>
                        <Icon icon={toolbarItem.icon}/>
                    </IconButton>}
                    </Tooltip>
                )}
        </RootStyle>
    )
}