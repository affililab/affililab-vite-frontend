import {Checkbox, makeStyles, TableBody, TableCell, TableHead, TableRow, TableSortLabel, useScrollSticky} from "my-lib";
import React, {createRef, FC, useContext} from "react";
import {StickySubNavContext} from "../../providers/StickyNavProvider";
import {TableComponentToolbar} from "@components/Table/Toolbar";

export const TableComponentHead: FC<any> = ({
                                       showCheckbox,
                                       disableMenu,
                                       order,
                                       orderBy,
                                       rowCount,
                                       columns,
                                       numSelected,
                                       onRequestSort,
                                       onSelectAllClick,
                                       stickyColumnClass,
                                        sx
                                   }) => {

    const stickyRef = createRef();
    const [stuck] = useScrollSticky(stickyRef);

    const createSortHandler = (property) => (event) => {
        onRequestSort(property);
    };

    return <TableHead ref={stickyRef} sx={(theme: any) => ({  boxShadow: stuck ? theme.customShadows.z24 : "none" })}>
        <TableRow sx={(theme: any) => ({ top: -1, position: "sticky", zIndex: 1, background: stuck ? theme.palette.background.paper + " !important" : theme.palette.background.neutral})}>
            { showCheckbox && <TableCell>
               <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={() => onSelectAllClick(!(rowCount > 0 && numSelected === rowCount))}
                />
            </TableCell> }
            {columns.map((headCell, index) => (
                <TableCell
                    key={index}
                    align={headCell.alignRight ? 'right' : 'left'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                        sx={{display: "flex", alignItems: "center", gap: 2}}
                        hideSortIcon
                        active={orderBy === headCell.key}
                        direction={orderBy === headCell.key ? order : 'asc'}
                        onClick={createSortHandler(headCell.key)}
                    >
                        {headCell.label}
                        {/*{orderBy === headCell.key ? (*/}
                        {/*    <Box>{order === 'desc' ? "sort direction desc" : "sort direction asc" }</Box>) : null}*/}
                    </TableSortLabel>
                </TableCell>
            ))}
            {!disableMenu && <TableCell padding={"checkbox"} className={stickyColumnClass} sx={(theme: any) => ({  background: stuck ? theme.palette.background.paper + " !important" : theme.palette.background.neutral, boxShadow: !stuck ? theme.customShadows.z24 + " !important" : "none !important" })}  align={"center"}>
                Actions
            </TableCell>}
        </TableRow>
    </TableHead>
};