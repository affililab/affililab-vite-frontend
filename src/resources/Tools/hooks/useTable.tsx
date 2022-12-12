import {useState} from "react";
import {useData} from "@resources/Tools/hooks/useData";
import {
    Button,
    Chip,
    CopyToClipboard,
    Icon,
    Image,
    Label,
    Link,
    Tooltip,
    Typography,
    useSnackbar,
    useTheme
} from "my-lib";
import {partnerProgramsBackend} from "@config"

export const useTable = () => {
    const {
        items,
        deleteItems,
        page,
        setPage,
        loading,
        called,
        total,
        searchValue,
        setSearchValue,
        fetchNext,
        order,
        orderBy,
        setOrderBy,
        setOrder,
        setLimit,
        rowsPerPage,
        setRowsPerPage,
        refetchingOptions
    } = useData();

    const theme = useTheme();

    const { enqueueSnackbar } = useSnackbar();

    const [selected, setSelected] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentLink, setCurrentLink] = useState(null);
    const [showExternalLinkModal, setShowExternalLinkModal] = useState(null);
    const handleCloseModal = () => {
        setCurrentItem(null);
        setIsModalOpen(false);
    }
    const handleCloseDeleteModal = () => {
        setCurrentItem(null);
        setIsDeleteModalOpen(false);
    }

    const toggleExternalLink = (item, link) => {
        setCurrentItem(item);
        setCurrentLink(link);
        setShowExternalLinkModal(!showExternalLinkModal);
    }

    const handleCloseExternalLinkModal = () => {
        setCurrentItem(null);
        setShowExternalLinkModal(false);
    }

    const [currentItem, setCurrentItem] = useState(null);

    const onCopy = () => {
        enqueueSnackbar('Copied!');
    };

    const externalLinkItems = [
        (link) => <CopyToClipboard text={link} onCopy={onCopy}>
            <Tooltip title="Copy">
                <Button color="inherit" startIcon={<Icon icon={'eva:copy-fill'} width={24} height={24}/>}>Link
                    kopieren</Button>
            </Tooltip>
        </CopyToClipboard>
    ];

    const columns = [
        {
            key: "cover",
            label: "Cover",
            alignRight: false,
            renderCell: (row, value) => value ? <Image
                disabledEffect
                alt={row.title}
                src={partnerProgramsBackend.filesEndpoint + value}
                sx={{borderRadius: 1.5, width: 32, mr: 2}}
            /> : "-"
        },
        {
            key: "title",
            label: "Name",
            alignRight: false,
            renderCell: (row, value) => <Typography variant="subtitle2" noWrap>
                {value}
            </Typography>
        },
        // {
        //     key: "description",
        //     label: "Description",
        //     alignRight: false,
        //     renderCell: (row, value) => <Typography variant="subtitle2" noWrap>
        //         {renderHTML(stripJS(value))}
        //     </Typography>
        // },
        {
            key: "link",
            label: "link",
            alignRight: false,
            renderCell: (row, value) => <Typography variant="subtitle2" noWrap>
                <Link sx={(theme) => ({ cursor: "pointer", color: theme.palette.info.light })} onClick={(e) => { e.preventDefault(); toggleExternalLink(row, value) }}><Icon icon={"akar-icons:link-chain"} sx={{ mr: 2 }} />{value}</Link>
            </Typography>
        },
        {
            key: "categories",
            label: "categories",
            alignRight: false,
            renderCell: (row, value) => value.map(item => <Chip title={item.title} label={item.title} />)
        },
        {
            key: "shortDescription",
            label: "Short",
            alignRight: false,
            renderCell: (row, value) => <Typography variant="subtitle2" noWrap>
                {value}
            </Typography>
        },
        {
            key: "approved",
            label: "approved",
            alignRight: false,
            renderCell: (row, value) =>   <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={value ? 'success' : 'warning'}
            >
                {value ? 'approved' : 'not approved' }
            </Label>
        }
    ]

    const toolbarItems = [{
        title: "edit",
        click: (row) => {
            setIsModalOpen(true);
        },
        element: <Button
            variant="contained"
            startIcon={<Icon icon={'eva:plus-fill'}/>}
            onClick={() => {
                setCurrentItem(null);
                setIsModalOpen(true);
            }}
        >new Tool</Button>,
        icon: 'fluent:text-bullet-list-square-edit-20-regular'
    }];
    const menuItems = [ {
        title: "edit",
        click: (row) => {
            setCurrentItem(row);
            setIsModalOpen(true);
        },
        icon: 'fluent:text-bullet-list-square-edit-20-regular'
    },
        {
            title: "delete",
            click: (row) => {
                setCurrentItem(row);
                setIsDeleteModalOpen(true);
            },
            style: {color: 'error.main'},
            icon: 'fluent:delete-48-regular'
        }
    ];

    const handleSearch = (searchValue) => {
        setSearchValue(searchValue);
    }

    const handleRequestSort = (param) => {
        setOrderBy(param);
        setOrder(order === "asc" ? "desc" : "asc")
    }

    const changePageHandler = (e, page) => {
        setPage(page);
    }

    const changeRowsPerPageHandler = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setLimit(parseInt(e.target.value, 10));
        setPage(0);
    }

    const deleteAgreeHandler = async () => {
        !!selected.length ? await deleteItems(selected) : await deleteItems([currentItem.id]);
        setSelected([]);
        setIsDeleteModalOpen(false);
    }

    return {
        items,
        page,
        loading,
        called,
        order, setOrder,
        orderBy, setOrderBy,
        rowsPerPage, setRowsPerPage,
        selected, setSelected,
        handleSearch,
        handleRequestSort,
        changePageHandler,
        changeRowsPerPageHandler,
        handleCloseModal,
        handleCloseDeleteModal,
        currentItem,
        isModalOpen,
        menuItems,
        toolbarItems,
        total,
        columns,
        refetchingOptions,
        deleteAgreeHandler,
        isDeleteModalOpen,
        setIsDeleteModalOpen,
        toggleExternalLink,
        showExternalLinkModal,
        externalLinkItems,
        handleCloseExternalLinkModal,
        currentLink,
        fetchNext
    }
}
