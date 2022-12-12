import PropTypes from 'prop-types';

import { useTheme, styled, Toolbar, Tooltip, IconButton, Typography, InputAdornment, Icon, InputStyle } from "my-lib"

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
    numSelected: PropTypes.number,
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
    onDeleteUsers: PropTypes.func,
};

export default function UserListToolbar({ numSelected, filterName, onFilterName, onDeleteUsers }: any) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';

    return (
        <RootStyle
            sx={{
                ...(numSelected > 0 && {
                    color: isLight ? 'primary.main' : 'text.primary',
                    bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography component="div" variant="subtitle1">
                    {numSelected} selected
                </Typography>
            ) : (
                <InputStyle
                    stretchStart={240}
                    size={"small"}
                    value={filterName}
                    onChange={(event) => onFilterName(event.target.value)}
                    placeholder="Search filter ..."
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Icon icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                            </InputAdornment>
                        ),
                    }}
                />
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={onDeleteUsers}>
                        <Icon icon={'eva:trash-2-outline'} />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <Icon icon={'ic:round-filter-list'} />
                    </IconButton>
                </Tooltip>
            )}
        </RootStyle>
    );
}
