import {FC} from "react";
import {Button, CopyToClipboard, ExternalLinkModal, Icon, Tooltip, useSnackbar} from "my-lib"

export const ExternalItemModal: FC<any> = ({
                                      item,
                                      link = "",
                                      open,
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
        </CopyToClipboard>
    ];

    return <ExternalLinkModal title={item?.title} link={link} isOpen={open} handleClose={handleClose}
                              actionItems={items}/>
}