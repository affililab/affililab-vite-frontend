import {FC, useState} from 'react';
import {Box, Icon, IconButton, MenuItem, MenuPopover, Router, Tooltip} from "my-lib";

const {Link: RouterLink} = Router;

export const TableComponentMoreMenu: FC<any> = ({
                                                    onDelete, row, moreMenuOnlyItems, menuItems = [
        {
            title: "Delete",
            click: onDelete,
            style: {color: 'error.main'},
            icon: 'eva:trash-2-outline'
        },
        {
            title: "Edit",
            click: () => {
            },
            icon: 'eva:edit-fill'
        },
    ]
                                                }) => {
    const [open, setOpen] = useState(null);

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    }

    const handleClose = () => {
        setOpen(null);
    }

    const ICON = {
        mr: 2,
        width: 20,
        height: 20
    }

    return (<>
        {moreMenuOnlyItems ? <Box sx={{display: "flex"}}>
            {menuItems.map((menuItem, index) => <Tooltip key={index} title={menuItem.title}>
                <IconButton  onClick={() => menuItem.click(row)}>
                    <Icon sx={{...menuItem.style}} icon={menuItem.icon}/>
                </IconButton></Tooltip>)}
        </Box> : <IconButton onClick={handleOpen}>
            <Icon icon={'eva:more-vertical-fill'} width={20} height={20}/>
        </IconButton>}

        <MenuPopover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            anchorOrigin={{vertical: 'top', horizontal: 'left'}}
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            arrow="right-top"
            sx={{
                mt: -1,
                '& .MuiMenuItem-root': {px: 1, typography: 'body2', borderRadius: 0.75},
            }}
        >
            {menuItems.map((menuItem, index) => <MenuItem key={index} onClick={() => {
                setOpen(false)
                menuItem.click(row)
            }}
                                                          sx={{...menuItem?.style}}>
                <Icon icon={menuItem.icon} sx={{...ICON}}/>
                {menuItem.title}
            </MenuItem>)}
        </MenuPopover>
    </>)
}