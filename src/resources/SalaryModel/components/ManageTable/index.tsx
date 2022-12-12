import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/SalaryModel/configs/resourceSchema"
import {useData} from "@resources/SalaryModel/hooks/useData";

export const ManageTable = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"SalaryModel"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}