import {Card} from "my-lib"
import {ComparisonChart} from "@resources/Product/components/ComparisonChart";
import {FC} from "react";

export const ChartView: FC<any> = ({ items }) => {
    return  <Card style={{ height: "100%", width: '100%' }}>
        <ComparisonChart items={items} />
    </Card>
};