import {FC} from "react";
import { ManageTable as CommonManageTable } from "@components/ManageTable"
import { resourceSchema } from "@resources/TargetGroup/configs/resourceSchema"
import {useData} from "@resources/TargetGroup/hooks/useData";

export const ManageTable: FC<any> = () => {
    const resourceData = useData();

    return <>
        <CommonManageTable resourceName={"TargetGroup"} resourceData={resourceData} resourceSchema={resourceSchema()} />
    </>;
}