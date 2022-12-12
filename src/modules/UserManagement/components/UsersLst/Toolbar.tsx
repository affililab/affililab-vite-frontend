import PropTypes from 'prop-types';

import {useTheme, styled, Toolbar, Tooltip, IconButton, Typography, InputAdornment, Icon, InputStyle, Box} from "my-lib"

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
    numSelected: PropTypes.number,
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
    onDeleteUsers: PropTypes.func,
};

export default function UserListToolbar({ leftElements = [], numSelected, filterName, onFilterName, onDeleteUsers }) {
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
            {numSelected > 0 && (
                <Typography component="div" variant="subtitle1">
                    {numSelected} selected
                </Typography>
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
                        <Icon icon={'icon-park-outline:setting-config'} />
                    </IconButton>
                </Tooltip>
            )}

            {!numSelected && <Box>
                {leftElements.map(leftElement => leftElement)}
            </Box>}
        </RootStyle>
    );
}
