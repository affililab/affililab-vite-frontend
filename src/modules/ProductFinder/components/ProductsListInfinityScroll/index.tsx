import {
    Box,
    Button,
    CircularProgress,
    Container,
    EmptyContent,
    HeaderItemsContext,
    InfiniteScroll,
    m,
    SearchInput,
    varContainer
} from "my-lib";
import {PartnerProgramsList} from "@resources/Product/PartnerProgram";
import React, {FC, useContext, useEffect, useState} from "react";
import {usePartnerPrograms} from "@resources/Product/hooks/usePartnerPrograms";
import {useNoticedPartnerProgram} from "@resources/Product/hooks/useNoticedPartnerProgram";
import {AddToModal} from "@resources/Campaign/components/AddToModal";
import {useAddToCampaign} from "@resources/Campaign/hooks/useAddToCampaign";
import {ExternalProductsPageModal, NoticedPartnerProgramsModal} from "@resources/Product/components";
import {useExternalLink} from "@resources/Product/hooks/useExternalLink";
import {PartnerProgramModal} from "@resources/Product/components/PartnerProgramModal";
import {NoticedBottomBar} from "@resources/Product/components/NoticedBottomBar";

export const ProductsListInfinityScroll: FC<any> = ({
                                                        limit,
                                                        resetAll,
                                                        resetScroll,
                                                        scrollableNodeRef,
                                                        searchValue,
                                                        setSearchValue,
                                                        direction,
                                                        sortBy,
                                                        graphqlFilters
                                                    }) => {

    const [currentPartnerProgram, setCurrentPartnerProgram] = useState(null);

    const [showPartnerProgramModal, setShowPartnerProgramModal] = useState(false);
    const {setCenterItems} = useContext(HeaderItemsContext);

    const toggleDetailedPartnerProgramModal = (partnerProgram) => {
        setCurrentPartnerProgram(partnerProgram);
        setShowPartnerProgramModal(!showPartnerProgramModal);
    }

    const [fetchAllowed, setFetchAllowed] = useState(true);

    const {
        showExternalLinkModal,
        setShowExternalLinkModal,
        currentPartnerProgramLink,
        toggleExternalLink
    } = useExternalLink(setCurrentPartnerProgram);

    const {
        showNoticedPartnerPrograms,
        setShowNoticedPartnerPrograms,
        noticedPartnerPrograms,
        dipatchToggleNoticedPartnerProgram,
        handleCloseNoticedPartnerProgramsModal
    } = useNoticedPartnerProgram();

    const {
        refreshPartnerprograms,
        fetchNext,
        called,
        data,
        emptyData,
        partnerprograms,
        setPartnerprograms,
        loading,
        total,
        setTotal,
        page,
        setPage
    } = usePartnerPrograms(resetScroll, graphqlFilters, direction, sortBy, limit);

    const {
        showAddToCampaignModal,
        setShowAddToCampaignModal,
        addToCampaignItems,
        setAddToCampaignItems
    } = useAddToCampaign();

    const toggleNoticedPartnerPrograms = () => {

    };

    const nextPage = async () => {
        if (!fetchAllowed) return;
        setFetchAllowed(false);
        await fetchNext();
        setFetchAllowed(true);
    }

    useEffect(() => {
        setCenterItems([<SearchInput placeholder={"Suche aus über 8.000 Partnerprogrammen ..."}
                                     searchValue={searchValue}
                                     updateInput={setSearchValue}/>]);
    }, []);

    useEffect(() => {
        if (graphqlFilters) {
            resetScroll();
            refreshPartnerprograms()
        }
    }, [searchValue, graphqlFilters, sortBy, direction]);

    return <Box sx={(theme: any) => ({height: "100%", flex: 1, display: "flex", flexDirection: "column"})}
                component={m.div} variants={varContainer()}>
        <Container maxWidth={"xl"} sx={{height: "100%", flex: 1, display: "flex", flexDirection: "column"}}>
            {!!scrollableNodeRef.current &&
                <Box sx={(theme: any) => ({
                    height: "100%", flex: 1, display: "flex", flexDirection: "column",
                    ".infinite-scroll-component__outerdiv": {
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        ".infinite-scroll-component": {
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                        }
                    }
                })}>
                    {loading && <Box sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <CircularProgress/>
                    </Box>}
                    {(!loading && emptyData) &&
                        <Box sx={{
                            height: "100%",
                            flex: 1,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Box>
                                <EmptyContent
                                    title="Keine Suchergebnisse gefunden"
                                    description="Es wurden keine Partnerprogramme zu ihrer Suche gefunden"
                                    img="/static/illustrations/illustration_empty.svg"
                                />
                            </Box>
                            <Box>
                                <Button
                                    disableRipple
                                    onClick={resetAll}
                                >
                                    Filter Zurücksetzen
                                </Button>
                            </Box></Box>}
                    {(!loading && !emptyData) && <InfiniteScroll
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
                        dataLength={partnerprograms.length} // This is important field to render the next data
                        next={nextPage}
                        hasMore={(total - ((page + 1) * limit)) > 0}
                        loader={(total - ((page + 1) * limit)) > 0 && <Box sx={{
                            mt: 4,
                            height: "256px",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <CircularProgress/>
                        </Box>}
                        refreshFunction={refreshPartnerprograms}
                    >
                        <PartnerProgramsList
                            total={total}
                            addToCampaign={(id) => {
                                setAddToCampaignItems([id]);
                                setShowAddToCampaignModal(true);
                            }}
                            toggleModal={toggleDetailedPartnerProgramModal}
                            toggleExternalLink={toggleExternalLink}
                            toggleNoticedPartnerProgram={dipatchToggleNoticedPartnerProgram}
                            noticedPartnerPrograms={noticedPartnerPrograms}
                            scrollableNodeRef={scrollableNodeRef}
                            partnerprograms={partnerprograms}
                        />
                    </InfiniteScroll>} </Box>
            }
        </Container>
        <NoticedBottomBar noticedPartnerPrograms={noticedPartnerPrograms}
                          openNoticedPartnerProgramsModal={() => {
                              setShowNoticedPartnerPrograms(true)
                          }}
        />
        {/* modals */}
        <AddToModal addToObjects={{partnerPrograms: addToCampaignItems}} isModalOpen={showAddToCampaignModal}
                    handleCloseModal={() => {
                        setShowAddToCampaignModal(false)
                    }} resource={"Products"}
        />
        <ExternalProductsPageModal
            open={showExternalLinkModal}
            item={currentPartnerProgram}
            link={currentPartnerProgramLink}
            isNoticed={currentPartnerProgram ? noticedPartnerPrograms.find(item => item.id === currentPartnerProgram.id) : false}
            noticedPartnerPrograms={noticedPartnerPrograms}
            toggleNoticedPartnerProgram={dipatchToggleNoticedPartnerProgram}
            handleClose={() => {
                setShowExternalLinkModal(false)
            }}/>
        <PartnerProgramModal
            addToCampaign={(itemId: string) => {
                setAddToCampaignItems([itemId]);
                setShowAddToCampaignModal(true)
            }}
            isModalOpen={showPartnerProgramModal}
            toggleModal={toggleDetailedPartnerProgramModal}
            handleCloseModal={() => {
                setShowPartnerProgramModal(false)
            }}
            toggleNoticedPartnerProgram={dipatchToggleNoticedPartnerProgram}
            isNoticed={currentPartnerProgram ? noticedPartnerPrograms.find(item => item.id === currentPartnerProgram.id) : false}
            partnerprogram={currentPartnerProgram}
        />
        <NoticedPartnerProgramsModal
            addAllToCampaign={(itemId: string) => {
                setAddToCampaignItems(noticedPartnerPrograms.map((item: any) => item.id));
                setShowAddToCampaignModal(true)
            }}
            addToCampaign={(itemIds: string[]) => {
                setAddToCampaignItems(itemIds);
                setShowAddToCampaignModal(true)
            }}
            toggleDetailedModal={toggleDetailedPartnerProgramModal}
            isModalOpen={showNoticedPartnerPrograms}
            handleCloseModal={handleCloseNoticedPartnerProgramsModal}
        />
    </Box>
}