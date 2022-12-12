import {useState} from "react";
import {useELearningResourceData} from "@resources/ELearningResources/hook/useELearningResourceData";
import {Typography, Button, Icon} from "my-lib";
import { resourceSchema } from "@resources/ELearningResources/configs/resourceSchema"

export const useELearningResourceTable = () => {
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
    } = useELearningResourceData();

    const [selected, setSelected] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const handleCloseModal = () => {
        setCurrentItem(null);
        setIsModalOpen(false);
    }
    const handleCloseDeleteModal = () => {
        setCurrentItem(null);
        setIsDeleteModalOpen(false);
    }
    const [currentItem, setCurrentItem] = useState(null);

    const columns = [
        {
            key: "title",
            label: "Name",
            alignRight: false,
            renderCell: (row, value) => <Typography variant="subtitle2" noWrap>
                {value}
            </Typography>
        },
        {
            key: "description",
            label: "Description",
            alignRight: false,
            renderCell: (row, value) => <Typography variant="subtitle2" noWrap>
                {value}
            </Typography>
        },
        {
            key: "shortDescription",
            label: "Short",
            alignRight: false,
            renderCell: (row, value) => <Typography variant="subtitle2" noWrap>
                {value}
            </Typography>
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
        >new E-Learning Resource</Button>,
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
        fetchNext
    }
}
