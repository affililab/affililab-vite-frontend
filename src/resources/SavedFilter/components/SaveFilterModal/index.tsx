import React, {FC} from "react"
import {
    Box,
    DialogTitle,
    DialogAnimate, IconButton, Icon
} from "my-lib"
import { SaveFilterForm } from "../SaveFilterForm";

export const SaveFilterModal: FC<any> = ({ isModalOpen, item, searchValue, filterSettings, filter, handleCloseModal, update = false }) => {

    return <DialogAnimate maxWidth={"xl"} open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
            <DialogTitle variant={'subtitle1'}>Save Filter</DialogTitle>
            <IconButton aria-label="close" onClick={handleCloseModal}>
                <Icon width={42}
                      height={42}
                      icon={'ei:close'}/>
            </IconButton>
        </Box>
        <SaveFilterForm item={item} isEdit={update} currentSaveFilterSchema={filter} searchValue={searchValue} filterSettings={filterSettings} finishCallBack={() => { handleCloseModal() }} />
    </DialogAnimate>
};
