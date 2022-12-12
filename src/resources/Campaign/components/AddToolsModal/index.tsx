import React, {useState, useEffect} from "react";
import {
    DialogAnimate,
    DialogTitle,
    Box,
    Typography,
    Checkbox,
    LoadingButton,
    useSnackbar
} from "my-lib";
import {OverviewItems} from "@resources/Tools/components/OverviewItems";
import {useMutation} from "@apollo/client";
import {GET_CAMPAIGN, UPDATE_CAMPAIGN} from "@schemas";

const Content = ({item, resourceKey, handleCloseModal}) => {

    const { enqueueSnackbar } = useSnackbar();

    const [isLoading, setIsLoading] =  useState(false);

    const [editCampaignMutation, {error: updateCampaignError}] = useMutation(UPDATE_CAMPAIGN, {
        refetchQueries:  [{
            query: GET_CAMPAIGN,
            variables: {  id: item.id }
        }]
    });

    const [selectedItems, setSelectedItems] = useState([]);

    const addTo = async () => {
        setIsLoading(true);
        await editCampaignMutation({variables: {id: item.id, [resourceKey]: { add: selectedItems }}});
        setIsLoading(false);
        enqueueSnackbar('Item was added successfully!');
        handleCloseModal();
    }

    return <><Box>
        <OverviewItems implemented={item.tools.map(toolItem => toolItem.id)} selected={selectedItems} setSelected={setSelectedItems} isSelection/>
    </Box>
        <Box sx={{p: 2}}>
            <LoadingButton sx={{float: "right"}} onClick={() => {
                addTo()
            }} variant="contained" loading={isLoading}>
                add selected
            </LoadingButton>
        </Box>
    </>
};

export const AddToolsModal = ({
                                  isModalOpen,
                                  item,
                                  handleCloseModal,
                                  key = "tools",
                                  resource = "Resource"
                              }) => {
    return <DialogAnimate maxWidth={"xl"} open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle sx={{py: 2}}>Add {resource} to Campaign</DialogTitle>
        <Content item={item} resourceKey={key} handleCloseModal={handleCloseModal}/>
    </DialogAnimate>
}