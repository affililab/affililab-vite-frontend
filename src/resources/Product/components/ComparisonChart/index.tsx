import {BaseOptionChart, merge, ReactApexChart} from "my-lib";
import {FC} from "react";

export const ComparisonChart: FC<any> = ({items}) => {
    const categories = [
        {
            key: "provisionFixed",
            label: "Provision €"
        },
        {
            key: "rank",
            label: "Rank"
        },
        {
            key: "performance",
            label: "Performance"
        },
        {
            key: "provisionInPercent",
            label: "Provision %"
        },
        {
            key: "averageSalesPrice",
            label: "Durchschn. Verkaufspreis %"
        },
        {
            key: "salesPrestige",
            label: "Verkaufsrang"
        },
        {
            key: "cartConversionInPercent",
            label: "Abschlussrate"
        },
        {
            key: "cancellationRateInPercent",
            label: "Absprungrate"
        },
        {
            key: "cancellationRateInPercent",
            label: "Absprungrate"
        }
    ];

    const chart_data = items.map(item => ({ name: item.title, data: categories.map(categoryItem => item[categoryItem.key])}));

    const chartOptions = merge(BaseOptionChart(), {
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: categories.map(categoryItem => categoryItem.label),
        },
        tooltip: {
            // y: {
            //     formatter: (val) => `$ ${val} thousands`,
            // },
        },
        plotOptions: { bar: { columnWidth: '36%' } },
    });

    return  <ReactApexChart type="bar" series={chart_data} options={chartOptions} height={"624px"}  />;
}