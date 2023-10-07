import {Box, Container, Icon, Router, ToggleButton, ToggleButtonGroup, Typography} from "my-lib";
import React, {FC, useContext} from "react";
import {StickySubNavContext} from "../../../../providers/StickyNavProvider";

const {useNavigate} = Router;

export const SubNav: FC<any> = ({
                                    actionItemsLeft,
                                    actionItemsRight,
                                    filterHook,
                                    tabState,
                                    handleSortBy,
                                    handleDirectionSwitching,
                                    filtersList,
                                    direction,
                                    sortBy,
                                    openFilterModal,
                                    saveFilter
                                }) => {
    const [tab, setTab] = tabState;

    const {activeFilterCount} = filterHook;

    const {stuck} = useContext(StickySubNavContext);

    let navigate = useNavigate();

    return <Container maxWidth={"xl"}>
        <Box sx={(theme: any) => ({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: theme.spacing(4)
        })}>
            <Box style={{flex: 1, display: "flex", gap: "1rem"}}>
                {actionItemsLeft.map((actionItem: any, index: number) => <React.Fragment
                    key={actionItem.title + " " + index}>{actionItem(stuck)}</React.Fragment>)}
            </Box>
            <Box sx={{flex: 1, alignSelf: "center", display: "flex", justifyContent: "center"}}>
                <ToggleButtonGroup sx={(theme: any) => ({
                    height: "52px",
                    background: stuck ? theme.palette.background.neutral : "",
                    borderRadius: theme.shape.borderRadius,
                    overflow: "hidden",
                    gap: '1px',
                    ".MuiButtonBase-root": {
                        height: "100%",
                        margin: 0
                    },
                    "button:hover p,svg": {
                        color: theme.palette.text.primary + " !important"
                        // color: "textSecondary",
                    },
                    "button:not(.Mui-selected) > p,svg": {
                        color: theme.palette.text.secondary
                        // color: "textSecondary",
                    }
                })} value={tab} exclusive onChange={(event: any, tab: string) => {
                    if (!tab) return;
                    navigate("/" + tab)
                    setTab(tab)
                }}>
                    <ToggleButton
                        sx={(theme: any) => ({
                            gap: theme.spacing(2),
                            borderRadius: 0
                        })}
                        value="partnerPrograms">
                        <Icon icon="tabler:package" width={19} height={19}/>
                        <Typography color="textPrimary" variant="body2">Programme</Typography>
                    </ToggleButton>
                    {/*<ToggleButton*/}
                    {/*    sx={(theme: any) => ({gap: theme.spacing(2), borderRadius: 0})}*/}
                    {/*    value="new">*/}
                    {/*    <Icon icon="clarity:new-line" width={19} height={19}/>*/}
                    {/*    <Typography variant="body2">Neustarts</Typography>*/}
                    {/*</ToggleButton>*/}
                    <ToggleButton
                        sx={(theme: any) => ({gap: theme.spacing(2), borderRadius: 0})}
                        value="tools">
                        <Icon icon="clarity:tools-line" width={19} height={19}/>
                        <Typography variant="body2">Tools</Typography>
                    </ToggleButton>
                    <ToggleButton
                        sx={(theme: any) => ({
                            gap: theme.spacing(2),
                            borderRadius: 0,
                            // borderRadius: theme.shape.borderRadius
                        })}
                        value="eLearning">
                        <Icon icon="bx:movie-play" width={19} height={19}/> <Typography
                        variant="body2">Learning</Typography>
                    </ToggleButton>
                    <ToggleButton
                        sx={(theme: any) => ({gap: theme.spacing(2), borderRadius: 0})}
                        value="networks">
                        <Icon icon="bx:network-chart" width={19} height={19}/>
                        <Typography variant="body2">Netzwerke</Typography>
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <Box sx={{flex: 1, justifySelf: "flex-end", display: "flex", gap: "1rem", justifyContent: "flex-end"}}>
                {actionItemsRight.map((actionItem: any, index: number) => <React.Fragment
                    key={actionItem.title + " " + index}>{actionItem(stuck)}</React.Fragment>)}
            </Box>
        </Box>
    </Container>
}