import {
    Avatar,
    BaseOptionChart,
    Box,
    Chip,
    fDate,
    fDateTime,
    fRenderedHTML,
    Grid,
    Icon,
    Image,
    Label,
    Link,
    makeStyles,
    ReactApexChart,
    Typography,
    useTheme
} from "my-lib";
import {partnerProgramsBackend} from "@config";
import {merge} from "lodash";


const useStyles = makeStyles(theme => ({
    chartColumn: {
        ...theme.typography.body2,
        display: "flex",
        justifyContent: "center"
    }
}));


export const TableCellMapper = (type, cellTypeParams, cellFunctions) => {

    const theme = useTheme();

    const classes = useStyles();

    const chartOptions = (value) => ( merge(BaseOptionChart(), {
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

    const TextCellRenderer = (row, value) => <Typography sx={{ maxWidth: "256px" }} variant="body2" noWrap>
        { !!value && (fRenderedHTML(value.toString()) ?? "-") }
    </Typography>

    const LinkCellRenderer = (row, value) => <Typography variant="subtitle2" noWrap>
        {value ? <Link sx={(theme) => ({cursor: "pointer", color: theme.palette.info.light})} onClick={(e) => {
            e.preventDefault();
            cellFunctions.toggleExternalLink(row, value)
        }}><Icon icon={"akar-icons:link-chain"} sx={{mr: 2}}/>{value}</Link> : "-"}
    </Typography>

    const IconCellRenderer = (row, value) => value ? <Icon width={24} height={24} icon={value} sx={{mr: 2}} /> : "-"

    const CategoryCellRenderer = (row, value) => value.length ? <Grid container spacing={1}>{value.map(item => <Grid item><Chip title={item.title} label={item.title}/></Grid>)} </Grid> : "-"

    const RelationCellRenderer = (row, value) => value.length ? <Grid container spacing={1}>{value.map(item => <Grid item><Chip title={item.title} label={item.title}/></Grid>)} </Grid> : "-"

    const RelationSingleCellRenderer = (row, value) => value ? <Chip title={value.title} label={value.title} /> : "-"

    const ApprovedCellRenderer = (row, value) => <Label
        variant={ theme.palette.mode === 'dark' ? 'ghost' : 'filled'}
        color={value ? 'success' : 'warning'}
    >
        {value ? 'approved' : 'not approved'}
    </Label>

    const ActiveCellRenderer = (row, value) => <Label
        variant={ theme.palette.mode === 'dark' ? 'ghost' : 'filled'}
        color={value ? 'success' : 'error'}
    >
        {value ? 'active' : 'not active'}
    </Label>

    const ImageCellRenderer = (row, value) => value ? <Box sx={{
        justifyContent: "center",
        alignItems: "center",
        width: "156px",
        height: "auto",
        maxHeight: "86px",
        overflow: "hidden",
        borderRadius: 2,
        p: "4px"
    }}><Image
        src={value.includes("http") ? value : partnerProgramsBackend.previewFilesEndpoint + value}
        sx={{ height: "100%", width: "100%", borderRadius: 2 }}
    /></Box> : "-";

    const AvatarCellRenderer = (row, value) => <Avatar src={value ? partnerProgramsBackend.previewFilesEndpoint + value : "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_20.jpg"} sx={{ mr: 2 }} />;

    const PriceCellRenderer = (row, value) => <Typography variant="subtitle2" noWrap>
        {value ? `${value} €`: '-'}
    </Typography>

    const PercentageChartCellRenderer = (row, value) => value !== null ? <ReactApexChart
        className={classes.chartColumn}
        options={chartOptions(value)}
        width={56}
        height={46}
        type="bar"
        series={[{
            data: [value]
        }]}
    /> : <Typography variant="subtitle2" noWrap>
        -
    </Typography>

    const DateCellRenderer = (row, value) => <Typography variant="subtitle2" noWrap>
        {value ? fDate(value) : '-'}
    </Typography>

    const DateTimeCellRenderer = (row, value) => <Typography variant="subtitle2" noWrap>
        {value ? fDateTime(value) : '-'}
    </Typography>

    const VerifiedCellRenderer = (row, value) => <Label
        variant={ theme.palette.mode === 'dark' ? 'ghost' : 'filled'}
        color={value ? 'success' : 'warning'}
    >
        {value ? 'verified' : 'not verified'}
    </Label>

    const StatusCellRenderer = (row, value) => <Typography variant="subtitle2" noWrap>
        <Label
            variant={'filled'}
            color={(!value && 'error') || 'success'}
        >
            {value ? "active" : "banned"}
        </Label>
    </Typography>

    const OptionsCellRenderer = (row, value) => <Label
        variant={ theme.palette.mode === 'dark' ? 'ghost' : 'filled'}
        color={cellTypeParams.options[value] ? cellTypeParams.options[value].color : "error"}
    >
        {cellTypeParams.options[value] ? cellTypeParams.options[value].label : "not specified"}
    </Label>

    const AvatarName = (row, value) => <Box sx={{ display: "flex", alignItems: "center", gap: (theme) => theme.spacing(2) }}>
        <Avatar src={row["avatar"] ? partnerProgramsBackend.previewFilesEndpoint + row["avatar"] : "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_20.jpg"} sx={{ mr: 2 }} />
        <Typography sx={{ maxWidth: "256px" }} variant="body2" noWrap>
            {fRenderedHTML(row["name"]) ?? "-"}
        </Typography>
    </Box>

    // TODO: on/off cell renderer


    const cellTypeMappingObject = {
        text: TextCellRenderer,
        icon: IconCellRenderer,
        link: LinkCellRenderer,
        category: CategoryCellRenderer,
        relation: RelationCellRenderer,
        relationSingle: RelationSingleCellRenderer,
        approved: ApprovedCellRenderer,
        active: ActiveCellRenderer,
        avatar: AvatarCellRenderer,
        image: ImageCellRenderer,
        price: PriceCellRenderer,
        percentage: PercentageChartCellRenderer,
        date: DateCellRenderer,
        datetime: DateTimeCellRenderer,
        status: StatusCellRenderer,
        verified: VerifiedCellRenderer,
        options: OptionsCellRenderer,
        avatarName: AvatarName
    };

    return cellTypeMappingObject[type];
}
