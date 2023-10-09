import {
    DialogAnimate,
    DialogTitle,
    Box,
    Typography,
    Checkbox,
    LoadingButton,
    useSnackbar, IconButton, Icon
} from "my-lib";
import React, {useState, useEffect, FC} from "react";
import {useMutation} from "@apollo/client";
import {GET_CAMPAIGN, UPDATE_CAMPAIGN} from "@schemas/campaigns";
import {SelectItems} from "@resources/ELearningResources/components/SelectItems";

const Content: FC<any> = ({item, resourceKey, handleCloseModal}) => {

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

    return <><Box sx={{height: "70vh", display: "flex", flexDirection: "column", background: (theme) => theme.palette.background.neutral}}>
        <SelectItems implemented={item.eLearningResources.map(eLearningResourcesItem => eLearningResourcesItem.id)} selected={selectedItems} setSelected={setSelectedItems} isSelection/>
    </Box>
        <Box sx={{p: 2}}>
            <LoadingButton sx={{float: "right"}} size={'large'} onClick={() => {
                addTo()
            }} variant="contained" loading={isLoading}>
                add selected
            </LoadingButton>
        </Box>
    </>
};

export const AddELearningResourcesModal = ({
                                  isModalOpen,
                                  item,
                                  handleCloseModal,
                                  key = "eLearningResources",
                                  resource = "Resource"
                              }) => {
    return <DialogAnimate maxWidth={"xl"} open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{display: "flex", justifyContent: "space-between", p: 2}}>
            <DialogTitle sx={{py: 2}}>Add {resource} to Campaign</DialogTitle>
            <IconButton aria-label="close" onClick={handleCloseModal}>
                <Icon width={42}
                      height={42}
                      icon={'ei:close'}/>
            </IconButton>
        </Box>
        <Content item={item} resourceKey={key} handleCloseModal={handleCloseModal}/>
    </DialogAnimate>
}