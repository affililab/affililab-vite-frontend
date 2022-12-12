import React, {FC} from "react"
import {
    Box,
    DialogTitle,
    DialogAnimate
} from "my-lib"
import { SaveFilterForm } from "../SaveFilterForm";

export const SaveFilterModal: FC<any> = ({ isModalOpen, item, searchValue, filterSettings, filter, handleCloseModal, update = false }) => {

    return <DialogAnimate maxWidth={"md"} open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>Save Filter</DialogTitle>
        <Box my={4} p={2}>
            <SaveFilterForm item={item} isEdit={update} currentSaveFilterSchema={filter} searchValue={searchValue} filterSettings={filterSettings} finishCallBack={() => { handleCloseModal() }} />
        </Box>
    </DialogAnimate>
};
