import {FC} from "react";
import { Card } from "my-lib"
import { SelectedProductsTable } from "@resources/Product/components/SelectedProductsTable";

export const TableView: FC<any> = ({
                                       items,
                                       selectedItems = [],
                                       handleSelected,
                                       noticedPartnerPrograms,
                                       toggleNoticedPartnerProgram,
                                       toggleDetailedModal,
                                       addToCampaign
}) => {
    return <SelectedProductsTable items={items} selectedItems={selectedItems} handleSelected={handleSelected} noticedPartnerPrograms={noticedPartnerPrograms} toggleNoticedPartnerProgram={toggleNoticedPartnerProgram} toggleDetailedModal={toggleDetailedModal} addToCampaign={addToCampaign} />
};