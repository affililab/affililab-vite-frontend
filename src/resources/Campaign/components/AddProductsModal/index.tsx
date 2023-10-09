import React, {FC, useEffect, useState} from "react";
import {
    Box, DialogAnimate, DialogTitle, DialogActions, LoadingButton, useSnackbar, Icon, IconButton
} from "my-lib";
import {ProductsTable} from "@resources/Product/components/ProductsTable";
import {useMutation} from "@apollo/client";
import {GET_CAMPAIGN, GET_ROLES, UPDATE_CAMPAIGN} from "@schemas";
import {SelectTable} from "@resources/Product/components/SelectTable";

const Content: FC<any> = ({item, resourceKey, refetchingOptions = [], handleCloseModal}) => {

    const { enqueueSnackbar } = useSnackbar();

    const [isLoading, setIsLoading] =  useState(false);

    const [editCampaignMutation, {error: updateCampaignError}] = useMutation(UPDATE_CAMPAIGN, {
        refetchQueries:  refetchingOptions
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
        <SelectTable handleSelectedItems={(selected: any) => {
            setSelectedItems(selected);
        }} />
    </Box>
        <Box sx={{ p: 2 }}>
            <LoadingButton sx={{ float: "right" }} onClick={() => { addTo() }} size={'large'}  variant="contained" loading={isLoading}>
                add selected
            </LoadingButton>
        </Box>
    </>
};

export const AddProductsModal = ({
                                    refetchingOptions = [],
                                    isModalOpen,
                                    item,
                                    handleCloseModal,
                                    key = "partnerPrograms",
                                    resource = "Resource"
                                }) => {

    return (
        <DialogAnimate height={"50vh"} maxWidth={"xl"} open={isModalOpen} onClose={handleCloseModal}>
            <Box sx={{display: "flex", justifyContent: "space-between", p: 2}}>
                <DialogTitle sx={{py: 2}}>Add {resource} to Campaign</DialogTitle>
                <IconButton aria-label="close" onClick={handleCloseModal}>
                    <Icon width={42}
                          height={42}
                          icon={'ei:close'}/>
                </IconButton>
            </Box>
            <Content refetchingOptions={refetchingOptions} item={item} resourceKey={key} handleCloseModal={handleCloseModal} />
        </DialogAnimate>
    )
}