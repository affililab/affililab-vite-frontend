import React, {FC} from "react";
import {Box} from "my-lib"
import {SelectedProductsTable} from "@resources/Product/components/SelectedProductsTable";
import {ListView} from "@resources/Product/components/NoticedPartnerProgramsModal/ListView";

export const TableView: FC<any> = ({
                                       items,
                                       selectedItems = [],
                                       handleSelected,
                                       noticedPartnerPrograms,
                                       toggleNoticedPartnerProgram,
                                       toggleDetailedModal,
                                       addToCampaign
                                   }) => {
    return <Box sx={{height: "70vh", background: (theme: any) => theme.palette.background.neutral}}>
        <SelectedProductsTable items={items}
                               selectedItems={selectedItems}
                               handleSelected={handleSelected}
                               noticedPartnerPrograms={noticedPartnerPrograms}
                               toggleNoticedPartnerProgram={toggleNoticedPartnerProgram}
                               toggleDetailedModal={toggleDetailedModal} addToCampaign={addToCampaign}
        />
    </Box>
};

const compare = (prevProps: any, nextProps: any) => {
    return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}
export const TableViewMemo = React.memo(TableView,compare);