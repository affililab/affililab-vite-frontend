import {FC, useState} from "react"
import {
    ArrowIcon,
    Box,
    Checkbox, Collapse,
    List,
    ListItemIconStyle,
    ListItemStyle,
    ListItemTextStyle,
    ListSubheader,
    styled
} from "my-lib"

export const ListSubheaderStyle = styled((props) => <ListSubheader disableSticky disableGutters {...props} />)(
    ({ theme }) => ({
        ...theme.typography.overline,
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(1),
        color: theme.palette.text.primary,
        transition: theme.transitions.create('opacity', {
            duration: theme.transitions.duration.shorter,
        }),
    })
);

export const FilterNavSectionVertical: FC<any> = ({ setActiveStates, activeItems, navConfig, isCollapse = false, ...other }) => {
    return <Box {...other}>
        {navConfig.map((group) => (
            <List key={group.subheader} disablePadding sx={{ px: 2 }}>
                <ListSubheaderStyle
                    sx={{
                        position: "sticky",
                        top: 0,
                        p: 2,
                        backgroundColor: "background.paper",
                        zIndex: 999,
                        ...(isCollapse && {
                            opacity: 0,
                        }),

                    }}
                >
                    {group.subheader}
                </ListSubheaderStyle>
                {group.items.map((list) => <NavListRoot activeItems={activeItems} setActiveStates={setActiveStates} key={list.title} list={list} isCollapse={isCollapse} />)}
            </List>
        ))}
    </Box>
}

export function NavListRoot({ setActiveStates, activeItems, list, isCollapse }) {


    const [open, setOpen] = useState(false);

    const hasChildren = list.children;

    if (hasChildren) {
        return (
            <>
                <NavItemRoot activeItems={activeItems} setActiveStates={setActiveStates} item={list} isCollapse={isCollapse} open={open} onOpen={() => setOpen(!open)} />
                {!isCollapse && (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {(list.children || []).map((item) => (
                                <NavListSub key={item.title} list={item} />
                            ))}
                        </List>
                    </Collapse>
                )}
            </>
        );
    }

    return <NavItemRoot activeItems={activeItems} setActiveStates={setActiveStates} item={list} isCollapse={isCollapse} />;
}

export function NavItemRoot({ setActiveStates, activeItems = [], item, isCollapse, open = false, onOpen }) {

    const { title, icon, info, children } = item;

    const renderContent = (
        <>
            {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
            <ListItemTextStyle disableTypography primary={title} isCollapse={isCollapse} />
            {!isCollapse && (
                <>
                    {info && info}
                    {children && <ArrowIcon open={open} />}
                </>
            )}
        </>
    );

    if (children) {
        return (
            <ListItemStyle onClick={() => { setActiveStates(item) }} activeRoot={activeItems.includes(item.key)}>
                <Checkbox  checked={activeItems.includes(item.key)} onClick={() => { setActiveStates(item) }} /> {renderContent}
            </ListItemStyle>
        );
    }

    return <ListItemStyle onClick={() => { setActiveStates(item) }} activeRoot={activeItems.includes(item.key)}>
        <Checkbox checked={activeItems.includes(item.key)} onClick={() => { setActiveStates(item) }} /> {renderContent}
    </ListItemStyle>
}