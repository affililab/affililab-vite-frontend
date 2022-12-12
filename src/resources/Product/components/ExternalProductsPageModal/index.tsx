import {FC} from "react";
import {
    Icon,
    CopyToClipboard,
    ExternalLinkModal,
    Tooltip,
    Button,
    useSnackbar, ToggleButton
} from "my-lib"

export const ExternalProductsPageModal: FC<any> = ({
                                              item,
                                              isNoticed,
                                              link = "",
                                              open,
                                              toggleNoticedPartnerProgram,
                                              handleClose
                                          }) => {

    const {enqueueSnackbar} = useSnackbar();

    const onCopy = () => {
        enqueueSnackbar('Copied!');
    };

    const items = [
        (link) => <CopyToClipboard text={link} onCopy={onCopy}>
            <Tooltip title="Copy">
                <Button color="inherit" startIcon={<Icon icon={'eva:copy-fill'} width={24} height={24}/>}>Link
                    kopieren</Button>
            </Tooltip>
        </CopyToClipboard>,
        (link) => <Tooltip title={isNoticed ? "nicht mehr merken" : "merken"} arrow>
            <Button onClick={() => toggleNoticedPartnerProgram(item)} color="inherit"
                    startIcon={<Icon icon={isNoticed ? "bi:bookmark-star-fill" : "bi:bookmark-star"} width={24}
                                        height={24}/>}>{isNoticed ? "nicht mehr merken" : "merken"}</Button>
        </Tooltip>
    ];

    return <ExternalLinkModal title={item?.title} link={link} isOpen={open} handleClose={handleClose}
                              actionItems={items}/>
}