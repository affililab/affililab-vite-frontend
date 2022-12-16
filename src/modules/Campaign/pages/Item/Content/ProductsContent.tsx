import React, {useEffect, useState} from "react";
import {
    Scrollbar,
    Box,
    Grid,
    EmptyContent,
    Skeleton,
    Tooltip,
    Icon,
    ToggleButton, IconButton
} from "my-lib"
import {useLazyQuery} from "@apollo/client";
import {GET_PARTNERPROGRAMS_BY_IDS} from "@schemas";
import {PartnerProgramModal} from "@resources/Product/components/PartnerProgramModal";
import {Item} from "@resources/Product/components/Item";

const SkeletonLoad = (
    <Grid container spacing={3}>
        {[...Array(12)].map((item, index) => (
            <Grid item xs={12} sm={2} md={2} key={index}>
                <Skeleton
                    component={Box}
                    variant="rectangular"
                    sx={{width: '100%', paddingTop: '115%', borderRadius: 2}}
                />
            </Grid>
        ))}
    </Grid>
);

export const ProductsContent = ({pItems, campaignData, remove = () => {}, ids = []}) => {

    const [getItems, {loading, error, data, called}] = useLazyQuery(GET_PARTNERPROGRAMS_BY_IDS);

    const [items, setItems] = useState([]);

    const [showPartnerProgramModal, setShowPartnerProgramModal] = useState(false);
    const [currentPartnerProgram, setCurrentPartnerProgram] = useState(null);
    const toggleDetailedPartnerProgramModal = (partnerProgram) => {
        setCurrentPartnerProgram(partnerProgram);
        setShowPartnerProgramModal(!showPartnerProgramModal);
    }

    useEffect(() => {
        if (ids.length) getItems({variables: {ids}});
    }, [ids, campaignData]);

    useEffect(() => {
        if (data) setItems(data.getPartnerProgramsByIds);
    }, [data]);

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
            <Grid sx={{paddingRight: (theme) => theme.spacing(2) }} container spacing={4}>
            {(loading && !called) ? SkeletonLoad : items?.map((item, index) => (
                    <Grid item key={index + "" + item.title} sx={{width: "100%"}} xs={12}>
                        <Item
                            openModalHandler={() => toggleDetailedPartnerProgramModal(item)}
                            actionItems={[
                                (item, isAuthenticated) => <Box>
                                    <Tooltip title={"von Kampagne entfernen"} arrow>
                                        <IconButton
                                            sx={(theme: any) => ({ color: theme.palette.text.secondary, height: "42px", width: "42px"  })}
                                            value="checked" onClick={() => remove("partnerPrograms", item.id)}
                                            aria-label={"von Kampagne entfernen"}>
                                            <Icon
                                                width={19}
                                                height={19}
                                                sx={(theme) => ({
                                                    color: theme.palette.primary.dark
                                                })} icon={"codicon:remove"} />
                                        </IconButton>
                                    </Tooltip>
                                </Box>,
                                (item: any) => <Box>
                                    <Tooltip title={"öffnen"} arrow>
                                        <IconButton sx={(theme: any) => ({ color: theme.palette.text.secondary, height: "42px", width: "42px"  })}
                                                    onClick={() => toggleDetailedPartnerProgramModal(item)}
                                                    aria-label="open partnerprogram" component="label">
                                            <Icon
                                                width={24}
                                                height={24}
                                                sx={(theme) => ({
                                                 color: theme.palette.primary.dark
                                             })} icon={"akar-icons:eye-open"} />
                                        </IconButton>
                                        {/*<ToggleButton*/}
                                        {/*    sx={{ height: "42px", width: "42px" }}*/}
                                        {/*    value="checked" onClick={() => toggleModal(item)}*/}
                                        {/*              color="primary"*/}
                                        {/*              aria-label={"open partnerprogram"}>*/}
                                        {/*    <Icon*/}
                                        {/*        width={19}*/}
                                        {/*        height={19}*/}
                                        {/*        sx={(theme) => ({*/}
                                        {/*            color: theme.palette.primary.dark*/}
                                        {/*        })} icon={"tabler:arrows-maximize"} />*/}
                                        {/*</ToggleButton>*/}
                                    </Tooltip>
                                </Box>
                                // (item, isAuthenticated) => <Box>
                                //     <Tooltip title={"öffnen"} arrow>
                                //         <ToggleButton
                                //             sx={{ height: "42px", width: "42px" }}
                                //             value="checked" onClick={() => toggleDetailedPartnerProgramModal(item)}
                                //             color="primary"
                                //             aria-label={"open partnerprogram"}>
                                //             <Icon
                                //                 width={19}
                                //                 height={19}
                                //                 sx={(theme) => ({
                                //                     color: theme.palette.primary.dark
                                //                 })} icon={"tabler:arrows-maximize"} />
                                //         </ToggleButton>
                                //     </Tooltip>
                                // </Box>
                            ]}
                            item={item}
                        />
                    </Grid>
                ))}
            {(!loading && called && !items.length) &&
                <Box sx={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}><EmptyContent
                    title="Noch keine Partnerprogramme"
                    description="Sie haben noch keine Partnerprogramme zu ihrer Kampagne hinzugefügt"
                    img="/static/illustrations/illustration_empty.svg"
                /></Box>}
        </Grid>
    </>
}