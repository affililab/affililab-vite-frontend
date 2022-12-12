import React, {FC, useContext, useState} from 'react';
import {Box, Icon, InputAdornment, makeStyles, MenuItem, Select, ToggleButton} from 'my-lib';
import {StickySubNavContext} from "../../../../providers/StickyNavProvider";

// ----------------------------------------------------------------------

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    option: {
        ...theme.typography.body2
    }
}));

// ----------------------------------------------------------------------
//
// SortBy.propTypes = {
//     sortBy: PropTypes.string,
//     sortByOptions: PropTypes.array,
//     onSortBy: PropTypes.func,
//     className: PropTypes.string
// };

export const SortBy: FC<any> = ({sortByOptions, sortBy, onSortBy, className, directionSwitching, direction, ...other}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(null);
    const { stuck } = useContext(StickySubNavContext);

    const handleOpen = event => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const handleonSortBy = value => {
        handleClose();
        onSortBy(value);
    };

    return (
        <Box sx={{display: "flex", alignItems: "center", gap: 2}} {...other}>
            <Box>
                <Select
                    sx={(theme) => ({
                        gap: 2,
                        height: "52px",
                        px: 4,
                        borderRadius: theme.shape.borderRadius,
                        backgroundColor: stuck ? theme.palette.background.neutral : theme.palette.background.paper
                    })}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    size={"small"}
                    value={sortBy}
                    startAdornment={<InputAdornment position="start"><Icon
                        width={19} height={19}
                        icon={'clarity:sort-by-line'}/></InputAdornment>}
                    onChange={(e) => handleonSortBy(e.target.value)}
                >
                    {sortByOptions.map((option, index) => (
                        <MenuItem
                            key={index}
                            value={option.value}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box>
                <ToggleButton
                    sx={(theme) => ({
                        gap: 2,
                        height: "52px",
                        px: 2,
                        borderRadius: theme.shape.borderRadius,
                        backgroundColor: stuck ? theme.palette.background.neutral : theme.palette.background.paper
                    })}
                    size={"small"}
                    value="check"
                    onChange={() => {
                        directionSwitching(direction === 1 ? -1 : 1)
                    }}
                >
                    <Icon icon={direction === 1 ? 'eva:arrow-upward-fill' : 'eva:arrow-downward-fill'} width={19} height={19} />
                    {/*<Typography sx={{ marginLeft: ".2rem" }} variant="body2">sortieren</Typography>*/}
                </ToggleButton>
            </Box>
        </Box>
    );
};
