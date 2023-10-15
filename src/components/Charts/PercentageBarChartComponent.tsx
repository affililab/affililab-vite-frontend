import React, {FC} from "react";
import {BaseOptionChart, ReactApexChart, useTheme} from "my-lib";
import {merge} from "lodash";

type PercentageBarChartComponentProps = {
    percentage: number;
    height?: number;
    width?: number;
};

export const PercentageBarChartComponent: FC<PercentageBarChartComponentProps> = ({percentage, width = 112, height = 8}) => {

    const theme = useTheme();

    const chartOptions = (value: any) => ( merge(BaseOptionChart(), {
        chart: {
            type: "bar",
            offsetY: -8,
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
                barHeight: "100%",
                borderRadius: 0,
                colors: {
                    backgroundBarColors: [theme.palette.background.neutral],
                }
            }
        },
        colors: [theme.palette.primary.lighter],
        tooltip: {
            enabled: false
        },
        subtitle: {
            enabled: false,
        },
        xaxis: {
            categories: ["Process 1"]
        },
        yaxis: {
            max: 100
        },
        fill: {
            opacity: 1,
            colors: [theme.palette.primary.main],
            type: "solid",
            // gradient: {
            //     gradientToColors: [theme.palette.primary.light],
            //     shadeIntensity: 1,
            //     opacityFrom: 1,
            //     opacityTo: 1
            // }
        },
    }));

    return <ReactApexChart
        options={chartOptions(percentage)}
        width={112}
        height={8}
        type="bar"
        series={[{
            data: [percentage]
        }]}
    />;
};