import React, {FC, useEffect, useRef, useState} from "react";
import {Box, CircularProgress, Grid, Icon, IconButton, InfiniteScroll, Scrollbar, Tooltip} from "my-lib";
import {Item} from '@resources/Product/components/Item';
import {act} from "react-dom/test-utils";

const toStylelessDocument = (htmlString: string): string => {
    const regex = /style="(.*?)"/gm;
    const subst = ``;

    // The substituted value will be contained in the result variable
    return htmlString.replace(regex, subst);
};

export const ListView: FC<any> = ({
                                      items,
                                      active,
                                      noticedPartnerPrograms,
                                      selectedItems = [],
                                      toggleSelected = (item: string) => {
                                      },
                                      toggleNoticedPartnerProgram,
                                      toggleDetailedModal,
                                      addToCampaign
                                  }) => {

    const scrollableNodeRef = useRef();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    useEffect(() => {
        setPage(0);
        if (scrollableNodeRef) scrollableNodeRef.current.getScrollElement().scrollTo(0, 0);
    }, [active]);

    return <Box sx={{display: "flex", height: "70vh", background: (theme: any) => theme.palette.background.neutral}}>
        {scrollableNodeRef && <Scrollbar sx={{ display: "flex",
            flex: 1,
            flexDirection: "column",
            ".simplebar-content-wrapper": {
                // height: "100%",
                flex: 1,
                display: "flex",
                flexDirection: "column",
            },
            ".simplebar-content": {
                // height: "100%",
                flex: 1
            }
        }} forceVisible="y" autoHide={false} ref={scrollableNodeRef} style={{height: "100%"}}>
            {scrollableNodeRef.current && <InfiniteScroll
                    scrollableTarget={scrollableNodeRef.current.getScrollElement()}
                    scrollThreshold={1}
                    sx={(theme: any) => ({
                        height: "100%",
                        width: "100%",
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    })}
                    dataLength={items.slice(0, rowsPerPage + page * rowsPerPage).length} // This is important field to render the next data
                    next={() => {
                        setPage(page + 1)
                    }}
                    hasMore={rowsPerPage + page * rowsPerPage < items.length}
                    loader={rowsPerPage + page * rowsPerPage < items.length && <Box sx={{
                        mt: 4,
                        height: "256px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <CircularProgress/>
                    </Box>}
                    refreshFunction={() => {
                        setPage(0);
                    }}
                >
                    <Grid p={2} rowSpacing={3} container alignItems="center" justifyContent="center" spacing={4}>
                        {items.slice(0, rowsPerPage + page * rowsPerPage)?.map((partnerprogram: any, index: number) => (
                            <Grid key={index} item xs={12}><Item
                                selectable
                                selected={selectedItems.find(item => item === partnerprogram.id)}
                                toggleSelected={() => toggleSelected(partnerprogram.id)}
                                actionItems={[
                                    (item: any) => <Box>
                                        <Tooltip
                                            title={"merken"}
                                            arrow>
                                            <IconButton
                                                sx={(theme: any) => ({
                                                    color: theme.palette.text.secondary,
                                                    height: "42px",
                                                    width: "42px"
                                                })}
                                                value={noticedPartnerPrograms.find(item => item.id === partnerprogram.id) ? 'checked' : 'unchecked'}
                                                onClick={() => toggleNoticedPartnerProgram(item)}
                                                color="info"
                                                aria-label="toggle noticed partnerprogram"
                                            >
                                                <Icon
                                                    width={24}
                                                    height={24}
                                                    sx={(theme) => ({
                                                        color: theme.palette.primary.dark
                                                    })}
                                                    icon={noticedPartnerPrograms.find(item => item.id === partnerprogram.id) ? "bi:bookmark-star-fill" : "bi:bookmark-star"}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>,
                                    (item: any) => <Box>
                                        <Tooltip
                                            title={"öffnen"}
                                            arrow>
                                            <IconButton
                                                sx={(theme: any) => ({
                                                    color: theme.palette.text.secondary,
                                                    height: "42px",
                                                    width: "42px"
                                                })}
                                                onClick={() => toggleDetailedModal(item)}
                                                aria-label="open partnerprogram"
                                                component="label">
                                                <Icon
                                                    width={24}
                                                    height={24}
                                                    sx={(theme) => ({
                                                        color: theme.palette.primary.dark
                                                    })}
                                                    icon={"akar-icons:eye-open"}/>
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                ]}
                                toggleModal={toggleDetailedModal}
                                item={partnerprogram}
                                isNoticed={noticedPartnerPrograms.find(item => item.id === partnerprogram.id)}
                                toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}
                            /></Grid>))}
                    </Grid>
                </InfiniteScroll>}
        </Scrollbar>}
    </Box>
};

const compare = (prevProps: any, nextProps: any) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}
export const ListViewMemo = React.memo(ListView, compare);
