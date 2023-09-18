import {BaseOptionChart, merge, ReactApexChart} from "my-lib";
import {FC} from "react";

export const ComparisonChart: FC<any> = ({items}) => {
    const categories = [
        {
            key: "commissionFixed",
            label: "Commission €"
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
            key: "commissionInPercent",
            label: "Commission %"
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
            style: {
                fontSize: '12px',
                fontColor: "black",
                color: "black"
            },
            y: {
                formatter: (val) => `$ ${val} thousands`,
            },
        },
        plotOptions: { bar: { columnWidth: '36%' } },
    });

    return  <ReactApexChart type="bar" series={chart_data} options={chartOptions} height={"624px"}  />;
}