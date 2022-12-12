import React, {useState, useEffect, FC} from "react"
import {
    Button,
    Box,
    DialogTitle,
    DialogAnimate
} from "my-lib"
import {Filter} from "@resources/Product/components/Filter";

const ModalContent: FC<any> = ({saveFilter, filter, filtersList, applyFilter, resetFilter, handleCloseModal}) => {

    const [_filter, _setFilter] = useState(filter);

    useEffect(() => {
        _setFilter(filter);
    }, [filter]);

    return <>
        <Box>
            <Filter
                save={saveFilter}
                filter={_filter}
                setFilter={_setFilter}
                filtersList={filtersList}
                applyFilter={applyFilter}
            />
        </Box>
        <Box sx={(theme) => ({ width: "100%", height: "56px", display: "flex", justifyContent: "flex-end", alignItems: "center", px: 4, boxShadow: theme.customShadows.z12})}>
            <Box sx={{ justifySelf: "flex-end" }}>
                <Button onClick={() => { resetFilter() }} variant="text">
                    Filter zurücksetzen
                </Button>
                <Button onClick={() => { applyFilter(_filter); handleCloseModal(); }} variant="contained">
                    Filter anwenden
                </Button>
            </Box>
        </Box>
    </>
};

export const FilterModal = ({ saveFilter, resetFilter, filter, filtersList, applyFilter, isModalOpen, handleCloseModal }) => {
    return <DialogAnimate maxWidth={"md"} open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle sx={{ px: 2 }}>Filter Settings</DialogTitle>
        <ModalContent resetFilter={resetFilter} saveFilter={saveFilter}  filter={filter} filtersList={filtersList} applyFilter={applyFilter} handleCloseModal={handleCloseModal} />
    </DialogAnimate>
}
