import React, {FC, useContext, useRef, useState} from "react";
import {Badge, Box, FabButtonAnimate, Icon, Router, Scrollbar, ToggleButton, Typography, useAuth} from "my-lib";
import {SubNav} from "../SubNav"
import {useQuery} from "@apollo/client";
import {CATEGORIES_SALARYMODELS} from "@schemas/categoriesSalaryModels";
import {ProductsListInfinityScroll} from "../ProductsListInfinityScroll";
import {FilterModal} from "@resources/Product/components";
import {openModal} from "@slices/auth";
import {SaveFilterModal} from "@resources/SavedFilter/components/SaveFilterModal";
import {Tools} from "./Content/Tools";
import {ELearning} from "./Content/ELearning";
import {Networks} from "./Content/Networks";
import {SortBy} from "../SortBy";
import {WizardModal} from "@resources/Product/components/WizardModal";
import {StickySubNavContext, StickySubNavProvider} from "../../../../providers/StickyNavProvider";

const { useParams } = Router;

export const ProductsListContent: FC<any> = ({ filterHook = {} }) => {

    const { user } = useAuth();

    const { tab : paramTab } = useParams();

    const [showFilterModal, setShowFilterModal] = useState(false);
    const [showSaveFilterModal, setShowSaveFilterModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCloseSaveFilterModal = () => {
        setShowSaveFilterModal(false);
    }
    const handleCloseFilterModal = () => {
        setShowFilterModal(false);
    }

    const {
        resetFilter,
        resetAll,
        getGraphQlFilters,
        filtersList,
        filter,
        searchValue,
        setSearchValue,
        applyFilter,
        filterForm,
        activeFilterCount
    } = filterHook;

    const scrollableNodeRef = useRef();

    // tab
    const tabState = useState(paramTab ?? "partnerPrograms");

    const [tab, setTab] = tabState;

    // sort
    const [direction, setDirection] = useState(-1);
    const [sortBy, setSortBy] = useState("rank");


    const handleSortBy = async value => {
        setSortBy(value);
    };

    const handleDirectionSwitching = async value => {
        setDirection(value);
    };

    const resetScroll = () => {
        scrollableNodeRef?.current?.getScrollElement().scrollTo(0, 0);
    }

    const saveFilter = () => {
        if (user) {
            setShowSaveFilterModal(true);
            return;
        }
        openModal();
        setShowModal(true);
    }

    const TABS_CONTENT = {
        partnerPrograms: {
            actionItemsLeft: [
                (stuck: boolean) => <SortBy
                    sortBy={sortBy}
                    onSortBy={handleSortBy}
                    direction={direction}
                    directionSwitching={handleDirectionSwitching}
                    sortByOptions={[{
                        value: "rank",
                        label: "Rank",
                    }, {
                        value: "created",
                        label: "Erscheinungsdatum",
                    }, {
                        value: "title",
                        label: "title"
                    }, ...filtersList.map(filterItem => ({
                        value: filterItem.key,
                        label: filterItem.title
                    }))]}
                />
            ],
            content: <ProductsListInfinityScroll limit={10} resetAll={resetAll} scrollableNodeRef={scrollableNodeRef} searchValue={searchValue} direction={direction} sortBy={sortBy} graphqlFilters={getGraphQlFilters} resetScroll={resetScroll}  />,
            actionItemsRight: [
                (stuck: boolean) => <Badge badgeContent={activeFilterCount} color="primary">
                    <ToggleButton
                        value="check"
                        onChange={() => { setShowFilterModal(true) }}
                        sx={(theme) => ({
                            gap: 2,
                            height: "52px",
                            px: 4,
                            borderRadius: theme.shape.borderRadius,
                            backgroundColor: stuck ? theme.palette.background.neutral : theme.palette.background.paper
                        })}
                    >
                        <Icon icon={'akar-icons:settings-horizontal'} width="19" height="19" /> <Typography
                        variant="body2">Filter</Typography>
                    </ToggleButton>
                </Badge>,
                (stuck: boolean) => <ToggleButton
                    sx={(theme) => ({
                        gap: 2,
                        height: "52px",
                        px: 4,
                        borderRadius: theme.shape.borderRadius,
                        backgroundColor: stuck ? theme.palette.background.neutral : theme.palette.background.paper
                    })}
                    size={"small"}
                    value="check"
                    onChange={() => {
                        saveFilter()
                    }}
                >
                    <Icon icon={'fa-regular:save'} width="19" height="19" /> <Typography variant="body2">
                    speichern</Typography>
                </ToggleButton>
            ]
        },
        new: {
            content: <ProductsListInfinityScroll limit={10} resetAll={resetAll} scrollableNodeRef={scrollableNodeRef} searchValue={searchValue} direction={-1} sortBy={"created"} graphqlFilters={getGraphQlFilters} resetScroll={resetScroll}  />,
        },
        tools: {
            content: <Tools />
        },
        eLearning: {
            content: <ELearning />
        },
        networks: {
            content: <Networks />
        },
    };

    /* filter functionality */
    const {data: categorySalaryModelsData} = useQuery(CATEGORIES_SALARYMODELS);

    return <Box
        sx={(theme) => ({
            marginTop: "64px",
            height: "calc( 100vh - 64px )",
            ".simplebar-content": {
                height: "100%"
            }
        })}>
        <WizardModal isModalOpen={isModalOpen} handleCloseModal={() => setIsModalOpen(false)} />
        <Scrollbar sx={{ display: "flex",
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
            <Box sx={{ display: "flex",
                height: "100%",
                flexDirection: "column"}}>
                <StickySubNavProvider>
                    <SubNav actionItemsLeft={TABS_CONTENT[tab]?.actionItemsLeft ?? []} actionItemsRight={TABS_CONTENT[tab]?.actionItemsRight ?? []} direction={direction} sortBy={sortBy} filterHook={filterHook} tabState={tabState} handleDirectionSwitching={handleDirectionSwitching} handleSortBy={handleSortBy} filtersList={filtersList}  saveFilter={saveFilter} />
                </StickySubNavProvider>
                <Box sx={{flex: 1}}>{ TABS_CONTENT[tab]?.content ?? <>Unspecified Tab</> }</Box>
            </Box>
        </Scrollbar>
        <FilterModal
            save={saveFilter}
            filter={filter}
            resetFilter={resetFilter}
            filtersList={filtersList}
            applyFilter={applyFilter}
            isModalOpen={showFilterModal}
            handleCloseModal={handleCloseFilterModal} />
        <SaveFilterModal
            searchValue={searchValue}
            filterSettings={filtersList}
            filter={filter}
            isModalOpen={showSaveFilterModal}
            handleCloseModal={handleCloseSaveFilterModal}
        />
        <Box sx={{ position: "fixed", bottom: (theme) => theme.spacing(6), right: (theme) => theme.spacing(6), zIndex: 1002 }}>
            <FabButtonAnimate onClick={() => setIsModalOpen(true)} variant="extended" size="medium" color="primary">
                <Icon icon="bxs:magic-wand" width={24} height={24} />
                help finding product
            </FabButtonAnimate>
        </Box>
    </Box>
};