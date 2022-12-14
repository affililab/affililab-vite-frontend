import {FC, useState} from "react";
import {TableCellMapper} from "@components/TableCellMapper"
import {Button, CopyToClipboard, ExternalLinkModal, Icon, Tooltip} from "my-lib";
import {TableComponent} from "@components/Table";
import {EditCreateModal} from "@components/EditCreateModal";
import {DeleteModal} from "@components/DeleteModal";

export const ManageTable: FC<any> = ({resourceName = "item", resourceSchema = [], resourceData}) => {

    const {
        items,
        deleteItems,
        emptyData,
        page,
        setPage,
        loading,
        total,
        setSearchValue,
        order,
        orderBy,
        setOrderBy,
        setOrder,
        setLimit,
        rowsPerPage,
        setRowsPerPage,
        createMutation,
        editMutation,
        refetchingOptions
    } = resourceData;

    const [selected, setSelected] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [showExternalLinkModal, setShowExternalLinkModal] = useState(null);
    const [currentLink, setCurrentLink] = useState(null);

    const toggleExternalLink = (item, link) => {
        setCurrentItem(item);
        setCurrentLink(link);
        setShowExternalLinkModal(!showExternalLinkModal);
    }

    const columns = resourceSchema.filter(item => item.showInTable).map(resourceSchemaItem => ({
        key: resourceSchemaItem.key,
        label: resourceSchemaItem.tableConfig.label,
        ...resourceSchemaItem.tableConfig.cellConfig,
        renderCell: TableCellMapper(resourceSchemaItem.tableConfig.type, resourceSchemaItem.tableConfig.cellTypeParams, { toggleExternalLink })
    }));

    const handleCloseExternalLinkModal = () => {
        setCurrentItem(null);
        setShowExternalLinkModal(false);
    }

    const handleCloseModal = () => {
        setCurrentItem(null);
        setIsModalOpen(false);
    }
    const handleCloseDeleteModal = () => {
        setCurrentItem(null);
        setIsDeleteModalOpen(false);
    }
    const [currentItem, setCurrentItem] = useState(null);

    const toolbarItems = [{
        title: "edit",
        click: (row) => {
            setIsModalOpen(true);
        },
        element: <Button
            variant="contained"
            size={'large'}
            startIcon={<Icon icon={'ion:add'}/>}
            onClick={() => {
                setCurrentItem(null);
                setIsModalOpen(true);
            }}
        >new {resourceName} Resource</Button>,
        style: {color: 'error.main'},
        icon: 'fluent:text-bullet-list-square-edit-20-regular'
    }];
    const menuItems = [{
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

    return <>
        <ExternalLinkModal isOpen={showExternalLinkModal} link={currentLink} title={currentItem?.title} actionItems={externalLinkItems} handleClose={handleCloseExternalLinkModal} />
        <EditCreateModal
            resourceSchema={resourceSchema}
            refetchingOptions={refetchingOptions}
            isModalOpen={isModalOpen}
            item={currentItem}
            handleCloseModal={handleCloseModal}
            isEdit={!!currentItem}
            createMutation={createMutation}
            editMutation={editMutation} />
        <DeleteModal
            resourceName={resourceName}
            isModalOpen={isDeleteModalOpen}
            handleCloseModal={handleCloseDeleteModal}
            agree={deleteAgreeHandler}
        />
        <TableComponent
            resource={resourceName}
            height={"100%"}
            rows={loading ? [] : items}
            columns={columns}
            emptyData={emptyData}
            page={page}
            rowsPerPage={rowsPerPage}
            moreMenuOnlyItems
            loading={loading}
            order={order}
            orderBy={orderBy}
            total={total}
            deleteHandler={(ids) => {
                setSelected(ids);
                setIsDeleteModalOpen(true)
            }}
            selected={selected}
            setSelected={setSelected}
            handleSearch={handleSearch}
            handleRequestSort={handleRequestSort}
            changePageHandler={changePageHandler}
            changeRowsPerPageHandler={changeRowsPerPageHandler}
            disableFilter
            selectedToolbarItems={[]}
            toolbarItems={toolbarItems}
            menuItems={menuItems}
        /></>
}