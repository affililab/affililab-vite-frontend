import React, {FC, useEffect, useState} from "react"
import {Box, Button, DialogAnimate, DialogTitle, Icon, IconButton, Scrollbar} from "my-lib"
import {Filter} from "@resources/Product/components/Filter";

const ModalContent: FC<any> = ({saveFilter, filter, filtersList, applyFilter, resetFilter, handleCloseModal}) => {

    const [_filter, _setFilter] = useState(filter);

    useEffect(() => {
        _setFilter(filter);
    }, [filter]);

    return <Box sx={{ overflow: "hidden" }}>
                <Filter
                    save={saveFilter}
                    filter={_filter}
                    setFilter={_setFilter}
                    filtersList={filtersList}
                    applyFilter={applyFilter}
                />
        <Box sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            p: 2,
            boxShadow: (theme) => theme.customShadows.z12,
        }}>
            <Box  sx={{justifySelf: "flex-end", display : "flex", gap: (theme) => theme.spacing(2) }}>
                <Button size={'large'} onClick={() => {
                    resetFilter()
                }} variant="text">
                    Filter zurücksetzen
                </Button>
                <Button size={'large'} onClick={() => { applyFilter(_filter);
                    handleCloseModal(); }} variant="contained">
                    Filter anwenden
                    {/*<Icon sx={{ ml: 2 }} width={24}*/}
                    {/*      height={24}*/}
                    {/*      icon={'codicon:add'}/>*/}
                </Button>
            </Box>
        </Box>
    </Box>
};

export const FilterModal: FC<any> = ({
                                         saveFilter,
                                         resetFilter,
                                         filter,
                                         filtersList,
                                         applyFilter,
                                         isModalOpen,
                                         handleCloseModal
                                     }) => {
    return <DialogAnimate maxWidth={'xl'} open={isModalOpen}
                          onClose={handleCloseModal}>
        <Box sx={{display: "flex", justifyContent: "space-between", p: 2}}>
            <DialogTitle variant={'subtitle1'}>Filter Settings</DialogTitle>
            <IconButton aria-label="close" onClick={handleCloseModal}>
                <Icon width={42}
                      height={42}
                      icon={'ei:close'}/>
            </IconButton>
        </Box>
        <ModalContent resetFilter={resetFilter} saveFilter={saveFilter} filter={filter} filtersList={filtersList}
                      applyFilter={applyFilter} handleCloseModal={handleCloseModal}/>
    </DialogAnimate>
}
