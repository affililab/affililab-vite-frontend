import {Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel} from "my-lib";
import {FC} from "react";

const visuallyHidden = {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: '1px',
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: '1px',
};

export const ProductTableHead: FC<any> = ({
                                     order,
                                     orderBy,
                                     rowCount,
                                     headLabel,
                                     numSelected,
                                     onRequestSort,
                                     onSelectAllClick,
                                 }) => {
    return <TableHead>
        <TableRow>
            <TableCell>
                <Checkbox
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={(event) => onSelectAllClick(event.target.checked)}
                />
            </TableCell>
            {headLabel.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align={headCell.alignRight ? 'right' : 'left'}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                    <TableSortLabel
                        hideSortIcon
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : 'asc'}
                        onClick={() => onRequestSort(headCell.id)}
                    >
                        {headCell.label}
                        {orderBy === headCell.id ? (
                            <Box sx={{ ...visuallyHidden }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                        ) : null}
                    </TableSortLabel>
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
}