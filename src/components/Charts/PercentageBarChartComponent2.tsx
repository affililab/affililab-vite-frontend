import React, {FC} from "react";
import {BaseOptionChart, ReactApexChart, useTheme} from "my-lib";
import {merge} from "lodash";

type PercentageBarChartComponentProps = {
    percentage: number;
    height?: number;
    width?: number;
};

export const PercentageBarChartComponent2: FC<PercentageBarChartComponentProps> = ({percentage, width = 56, height = 46}) => {

    const theme = useTheme();

    const chartOptions = (value) => (merge(BaseOptionChart(), {
        chart: {
            type: "bar",
            stacked: true,
            sparkline: {
                enabled: true
            }
        },
        stroke: {
            width: 0,
            curve: 'smooth',
            lineCap: 'round'
        },
        plotOptions: {
            bar: {
                horizontal: true,
                barHeight: "20%",
                borderRadius: 0,
                colors: {
                    backgroundBarColors: ["#40475D"],
                }
            }
        },
        colors: [theme.palette.primary.lighter],
        subtitle: {
            floating: true,
            align: "right",
            offsetY: -2,
            offsetX: 8,
            text: value + "%",
            style: {
                color: theme.palette.text.primary,
                fontSize: 14
            }
        },
        tooltip: {
            enabled: false
        },
        xaxis: {
            categories: ["Process 1"]
        },
        yaxis: {
            max: 100
        },
        fill: {
            opacity: 1,
            type: "gradient",
            gradient: {
                gradientToColors: [theme.palette.primary.darker],
                shadeIntensity: 1,
                opacityFrom: 1,
                opacityTo: 1
            }
        },
    }));

    return <ReactApexChart
        options={chartOptions(percentage)}
        width={width}
        height={height}
        type="bar"
        series={[{
            data: [percentage]
        }]}
    />;
};