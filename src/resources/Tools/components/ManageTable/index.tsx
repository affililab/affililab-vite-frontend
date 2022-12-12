import {FC} from "react";
import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/Tools/configs/resourceSchema"
import {useData} from "@resources/Tools/hooks/useData";

export const ManageTable: FC<any> = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"Tool"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}