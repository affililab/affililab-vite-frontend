import React, {FC, useEffect, useState} from "react";
import {
    Box, DialogAnimate, DialogTitle, DialogActions, LoadingButton, useSnackbar
} from "my-lib";
import {ProductsTable} from "@resources/Product/components/ProductsTable";
import {useMutation} from "@apollo/client";
import {GET_CAMPAIGN, GET_ROLES, UPDATE_CAMPAIGN} from "@schemas";

const Content: FC<any> = ({item, resourceKey, handleCloseModal}) => {

    const { enqueueSnackbar } = useSnackbar();

    const [isLoading, setIsLoading] =  useState(false);

    const [editCampaignMutation, {error: updateCampaignError}] = useMutation(UPDATE_CAMPAIGN, {
        refetchQueries:  [{
            query: GET_CAMPAIGN,
            variables: { id: item.id }
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


    return <><Box sx={(theme) => ({borderBottom: "2px solid " + theme.palette.divider})}>
        <ProductsTable embedded={true} handleSelectedItems={setSelectedItems}/>
    </Box>
        <Box sx={{ p: 2 }}>
            <LoadingButton sx={{ float: "right" }} onClick={() => { addTo() }} variant="contained" loading={isLoading}>
                add selected
            </LoadingButton>
        </Box>
    </>
};

export const AddProductsModal = ({
                                    isModalOpen,
                                    item,
                                    handleCloseModal,
                                    key = "partnerPrograms",
                                    resource = "Resource"
                                }) => {

    return (
        <DialogAnimate maxWidth={"xl"} open={isModalOpen} onClose={handleCloseModal}>
            <DialogTitle sx={{py: 2}}>Add {resource} to Campaign</DialogTitle>
            <Content item={item} resourceKey={key} handleCloseModal={handleCloseModal} />
        </DialogAnimate>
    )
}