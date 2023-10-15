import React, {useEffect, useState} from "react";
import {Box, CircularProgress, EmptyContent, Grid, Icon, IconButton, InfiniteScroll, Tooltip} from "my-lib"
import {useLazyQuery} from "@apollo/client";
import {GET_PARTNERPROGRAMS_BY_IDS} from "@schemas";
import {PartnerProgramModal} from "@resources/Product/components/PartnerProgramModal";
import {Item} from "@resources/Product/components/Item";

export const ProductsContent = ({
                                    active, scrollableNodeRef, campaignData, remove = () => {
    }, ids = []
                                }) => {

    useEffect(() => {
        if (!active) return;
        setPage(0);
    }, [active]);

    const [getItems, {loading, error, data, called}] = useLazyQuery(GET_PARTNERPROGRAMS_BY_IDS);

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const [showPartnerProgramModal, setShowPartnerProgramModal] = useState(false);
    const [currentPartnerProgram, setCurrentPartnerProgram] = useState(null);

    const toggleDetailedPartnerProgramModal = (partnerProgram: any) => {
        setCurrentPartnerProgram(partnerProgram);
        setShowPartnerProgramModal(!showPartnerProgramModal);
    };

    const getPartnerPrograms = async () => {
        return (await getItems({
            variables: {
                ids
            }
        }));
    };

    useEffect(() => {
        if (ids.length) {
            // const response = await getCampaignCategoriesItems({variables: { id: campaignId }});
            (async () => {
                const response = await getPartnerPrograms();
                setItems(response.data.getPartnerProgramsByIds);
            })();
        }
    }, [ids, campaignData]);

    return <>
        <PartnerProgramModal
            isModalOpen={showPartnerProgramModal}
            actionItems={[]}
            toggleModal={toggleDetailedPartnerProgramModal}
            handleCloseModal={() => {
                setShowPartnerProgramModal(false)
            }}
            toggleNoticedPartnerProgram={() => {
            }}
            partnerprogram={currentPartnerProgram}
        />
        <InfiniteScroll
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
            <Grid rowSpacing={3} container alignItems="center" justifyContent="center">
                {(!loading && called) && items.slice(0, rowsPerPage + page * rowsPerPage)?.map((item, index) => (
                    <Grid item key={index + "" + item.title} sx={{width: "100%"}} xs={12}>
                        <Item
                            openModalHandler={() => toggleDetailedPartnerProgramModal(item)}
                            actionItems={[
                                (item, isAuthenticated) => <Box>
                                    <Tooltip title={"von Kampagne entfernen"} arrow>
                                        <IconButton
                                            sx={(theme: any) => ({
                                                color: theme.palette.text.secondary,
                                                height: "42px",
                                                width: "42px"
                                            })}
                                            value="checked" onClick={() => remove("partnerPrograms", item.id)}
                                            aria-label={"von Kampagne entfernen"}>
                                            <Icon
                                                width={19}
                                                height={19}
                                                sx={(theme) => ({
                                                    color: theme.palette.primary.dark
                                                })} icon={"codicon:remove"}/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>,
                                (item: any) => <Box>
                                    <Tooltip title={"öffnen"} arrow>
                                        <IconButton sx={(theme: any) => ({
                                            color: theme.palette.text.secondary,
                                            height: "42px",
                                            width: "42px"
                                        })}
                                                    onClick={() => toggleDetailedPartnerProgramModal(item)}
                                                    aria-label="open partnerprogram" component="label">
                                            <Icon
                                                width={24}
                                                height={24}
                                                sx={(theme) => ({
                                                    color: theme.palette.primary.dark
                                                })} icon={"akar-icons:eye-open"}/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            ]}
                            item={item}
                        />
                    </Grid>
                ))}
            </Grid>

        </InfiniteScroll>
        {!(!!data?.getPartnerProgramsByIds?.length) &&
            <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}><EmptyContent
                title="Noch keine Partnerprogramme"
                description="Sie haben noch keine Partnerprogramme zu ihrer Kampagne hinzugefügt"
                img="/static/illustrations/illustration_empty.svg"
            /></Box>}
    </>
}