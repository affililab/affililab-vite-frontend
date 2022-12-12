import { useState } from 'react';

import { paramCase, Icon, MenuPopover, MenuItem, IconButton, Router } from "my-lib"
const { Link : RouterLink } = Router;

// ----------------------------------------------------------------------

export default function UserMoreMenu({ onDelete, userName }: any) {
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    const ICON = {
        mr: 2,
        width: 20,
        height: 20,
    };

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Icon icon={'eva:more-vertical-fill'} width={20} height={20} />
            </IconButton>

            <MenuPopover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                arrow="right-top"
                sx={{
                    mt: -1,
                    width: 160,
                    '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
                }}
            >
                <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
                    <Icon icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
                    Delete
                </MenuItem>

                {/*<MenuItem component={RouterLink} to={`${PATH_DASHBOARD.user.root}/${paramCase(userName)}/edit`}>*/}
                <MenuItem component={RouterLink} to={"/app/admin/users"}>
                    <Icon icon={'eva:edit-fill'} sx={{ ...ICON }} />
                    Edit
                </MenuItem>
            </MenuPopover>
        </>
    );
}
