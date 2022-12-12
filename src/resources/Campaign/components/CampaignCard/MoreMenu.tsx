import { useState } from 'react';

import { paramCase, Icon, MenuPopover, MenuItem, IconButton, Router } from "my-lib"
const { Link : RouterLink } = Router;

export const CampaignMoreMenu = ({ onDelete, onEdit }) => {
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

    const handleDelete = () => {
        onDelete();
        setOpen(false);
    }

    const handleEdit = () => {
        onEdit();
        setOpen(false);
    }

    return (
        <>
            <IconButton onClick={handleOpen}>
                <Icon icon={'eva:more-vertical-fill'} color={"white"} width={20} height={20} />
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
                <MenuItem onClick={handleEdit}>
                    <Icon icon={'fluent:text-bullet-list-square-edit-20-regular'} sx={{ ...ICON }} />
                    edit
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
                    <Icon icon={'fluent:delete-48-regular'} sx={{ ...ICON }} />
                    Delete
                </MenuItem>
            </MenuPopover>
        </>
    );
}
