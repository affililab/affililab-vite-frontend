import {FC} from "react";
import { Card } from "my-lib"
import { SelectedProductsTable } from "@resources/Product/components/SelectedProductsTable";

export const TableView: FC<any> = ({ items, noticedPartnerPrograms, toggleNoticedPartnerProgram, toggleDetailedModal, addToCampaign }) => {
    return <Card style={{ height: "100%", width: '100%' }}>
        <SelectedProductsTable embedded items={items} noticedPartnerPrograms={noticedPartnerPrograms} toggleNoticedPartnerProgram={toggleNoticedPartnerProgram} toggleDetailedModal={toggleDetailedModal} addToCampaign={addToCampaign} />
    </Card>
};