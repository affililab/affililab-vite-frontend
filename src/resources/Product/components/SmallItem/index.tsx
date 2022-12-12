import {
    alpha,
    Card,
    CardContent,
    CardHeader,
    Button,
    Icon,
    SVGIcon,
    Image,
    Box,
    styled,
    Typography, Divider, Grid, Chip, Scrollbar, TextMaxLine, fRenderedHTML
} from "my-lib";
import {FC} from "react";

const ToolIconBox = styled(Box)(({theme}) => ({
    // ...cssStyles().bgBlur({ blur: 0, color: theme.palette.primary.darker }),
    backgroundColor: theme.palette.primary.main,
    borderRadius: 100,
    width: 48,
    height: 48,
    zIndex: 11,
    left: 0,
    right: 0,
    bottom: -16,
    position: 'absolute',
}));

const PrimaryColoredBox = styled(Box)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.background.neutral,
    minHeight: "124px"
}));

const toStylelessDocument = (htmlString: string): string => {
    const regex = /style="(.*?)"/gm;
    const subst = ``;
    // The substituted value will be contained in the result variable
    return htmlString.replace(regex, subst);
};

export const SmallItem: FC<any> = ({item, openModalHandler, actionItems = [<Button color="info"  variant="contained" target="_blank" size="small">Vergleichen</Button>], withDescription = false}) => {

    const {
        title,
        productImg,
        description
    } = item;

    return <Card sx={{textAlign: 'center', paddingBottom: 0, cursor: openModalHandler && "pointer"}}>
        <CardHeader
            sx={(theme) => ({
                position: "absolute",
                height: "64px",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 2,
            })}
            action={<>{actionItems.map(item => item)}</>}
        />
        <CardContent onClick={() => {
            openModalHandler()
        }} sx={{p: 0}}>
            <Box sx={{position: 'relative'}}>
                <SVGIcon
                    src="https://minimal-assets-api.vercel.app/assets/icons/shape-avatar.svg"
                    sx={{
                        width: 144,
                        height: 62,
                        zIndex: 10,
                        left: 0,
                        right: 0,
                        bottom: -26,
                        mx: 'auto',
                        position: 'absolute',
                        color: 'background.paper',
                    }}
                />
                <ToolIconBox sx={{
                    left: 0,
                    right: 0,
                    bottom: -16,
                    mx: 'auto',
                    position: 'absolute',
                    p: 2
                }}>
                    <Icon icon={'eos-icons:product-subscriptions-outlined'} sx={{
                        color: "white",
                        width: "100%",
                        height: "100%"
                    }}/>
                </ToolIconBox>
                <PrimaryColoredBox>
                    <Image sx={{width: "124px", maxHeight: "124px"}} src={productImg}/>
                </PrimaryColoredBox>
            </Box>
            <Typography variant="subtitle2" sx={{mt: 6, mb: 2, p: 2, height: "48px"}}>
                {title}
            </Typography>
            {/*{ withDescription && <Typography variant="body2" sx={{align: "center", px: 4, pb: 2, height: "84px"}}>*/}
            {/*    <TextMaxLine line={3}>*/}
            {/*        {fRenderedHTML(description)}*/}
            {/*    </TextMaxLine>*/}
            {/*</Typography>}*/}
        </CardContent>
    </Card>
}