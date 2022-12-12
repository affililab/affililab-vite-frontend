import React, {useEffect, useState} from "react";
import {
    Avatar,
    Box,
    Button,
    Checkbox, Icon,
    Label, makeStyles,
    Scrollbar,
    SearchNotFound,
    sentenceCase,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TablePagination,
    TableRow,
    Typography,
    useTheme
} from "my-lib";
import ListToolbar from "./Toolbar"
import ListHead from "./Head"
import MoreMenu from "./MoreMenu"
import {StickySubNavProvider} from "../../../../providers/StickyNavProvider";

const _userList = [{
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_1.jpg",
    "name": "Jayvion Simon",
    "email": "nannie_abernathy70@yahoo.com",
    "phoneNumber": "365-374-4961",
    "address": "908 Jack Locks",
    "country": "Kenya",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Lueilwitz and Sons",
    "isVerified": true,
    "status": "active",
    "role": "UX Designer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_2.jpg",
    "name": "Lucian Obrien",
    "email": "ashlynn_ohara62@gmail.com",
    "phoneNumber": "904-966-2836",
    "address": "908 Jack Locks",
    "country": "Madagascar",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Gleichner, Mueller and Tromp",
    "isVerified": true,
    "status": "active",
    "role": "Full Stack Designer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_3.jpg",
    "name": "Deja Brady",
    "email": "milo.farrell@hotmail.com",
    "phoneNumber": "399-757-9909",
    "address": "908 Jack Locks",
    "country": "Netherlands Antilles",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Nikolaus - Leuschke",
    "isVerified": true,
    "status": "banned",
    "role": "Backend Developer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_4.jpg",
    "name": "Harrison Stein",
    "email": "violet.ratke86@yahoo.com",
    "phoneNumber": "692-767-2903",
    "address": "908 Jack Locks",
    "country": "Azerbaijan",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Hegmann, Kreiger and Bayer",
    "isVerified": false,
    "status": "banned",
    "role": "UX Designer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_5.jpg",
    "name": "Reece Chung",
    "email": "letha_lubowitz24@yahoo.com",
    "phoneNumber": "990-588-5716",
    "address": "908 Jack Locks",
    "country": "Aruba",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Grimes Inc",
    "isVerified": false,
    "status": "banned",
    "role": "UX Designer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_6.jpg",
    "name": "Lainey Davidson",
    "email": "aditya_greenfelder31@gmail.com",
    "phoneNumber": "955-439-2578",
    "address": "908 Jack Locks",
    "country": "Comoros",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Durgan - Murazik",
    "isVerified": true,
    "status": "active",
    "role": "Project Manager"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_7.jpg",
    "name": "Cristopher Cardenas",
    "email": "lenna_bergnaum27@hotmail.com",
    "phoneNumber": "226-924-4058",
    "address": "908 Jack Locks",
    "country": "Sierra Leone",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Altenwerth, Medhurst and Roberts",
    "isVerified": false,
    "status": "active",
    "role": "Leader"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_8.jpg",
    "name": "Melanie Noble",
    "email": "luella.ryan33@gmail.com",
    "phoneNumber": "552-917-1454",
    "address": "908 Jack Locks",
    "country": "Bermuda",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Raynor Group",
    "isVerified": false,
    "status": "banned",
    "role": "Backend Developer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_9.jpg",
    "name": "Chase Day",
    "email": "joana.simonis84@gmail.com",
    "phoneNumber": "285-840-9338",
    "address": "908 Jack Locks",
    "country": "Italy",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Mraz, Donnelly and Collins",
    "isVerified": false,
    "status": "banned",
    "role": "Project Manager"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_10.jpg",
    "name": "Shawn Manning",
    "email": "marjolaine_white94@gmail.com",
    "phoneNumber": "306-269-2446",
    "address": "908 Jack Locks",
    "country": "Iran",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Padberg - Bailey",
    "isVerified": false,
    "status": "banned",
    "role": "UI Designer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b11",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_11.jpg",
    "name": "Soren Durham",
    "email": "vergie_block82@hotmail.com",
    "phoneNumber": "883-373-6253",
    "address": "908 Jack Locks",
    "country": "Denmark",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Heidenreich, Stokes and Parker",
    "isVerified": true,
    "status": "active",
    "role": "UI/UX Designer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b12",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_12.jpg",
    "name": "Cortez Herring",
    "email": "vito.hudson@hotmail.com",
    "phoneNumber": "476-509-8866",
    "address": "908 Jack Locks",
    "country": "Congo",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Pagac and Sons",
    "isVerified": true,
    "status": "banned",
    "role": "UI/UX Designer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b13",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_13.jpg",
    "name": "Brycen Jimenez",
    "email": "tyrel_greenholt@gmail.com",
    "phoneNumber": "201-465-1954",
    "address": "908 Jack Locks",
    "country": "Cambodia",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Rempel, Hand and Herzog",
    "isVerified": true,
    "status": "active",
    "role": "UI Designer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b14",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_14.jpg",
    "name": "Giana Brandt",
    "email": "dwight.block85@yahoo.com",
    "phoneNumber": "538-295-9408",
    "address": "908 Jack Locks",
    "country": "Virgin Islands, British",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Dare - Treutel",
    "isVerified": false,
    "status": "active",
    "role": "Backend Developer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b15",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_15.jpg",
    "name": "Aspen Schmitt",
    "email": "mireya13@hotmail.com",
    "phoneNumber": "531-492-6028",
    "address": "908 Jack Locks",
    "country": "Bahamas",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Kihn, Marquardt and Crist",
    "isVerified": false,
    "status": "active",
    "role": "Backend Developer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b16",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_16.jpg",
    "name": "Colten Aguilar",
    "email": "dasia_jenkins@hotmail.com",
    "phoneNumber": "981-699-7588",
    "address": "908 Jack Locks",
    "country": "Italy",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Nolan - Kunde",
    "isVerified": false,
    "status": "active",
    "role": "Front End Developer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_17.jpg",
    "name": "Angelique Morse",
    "email": "benny89@yahoo.com",
    "phoneNumber": "500-268-4826",
    "address": "908 Jack Locks",
    "country": "France",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Wuckert Inc",
    "isVerified": true,
    "status": "banned",
    "role": "Backend Developer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b18",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_18.jpg",
    "name": "Selina Boyer",
    "email": "dawn.goyette@gmail.com",
    "phoneNumber": "205-952-3828",
    "address": "908 Jack Locks",
    "country": "Portugal",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Dibbert Inc",
    "isVerified": false,
    "status": "banned",
    "role": "Full Stack Designer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b19",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_19.jpg",
    "name": "Lawson Bass",
    "email": "zella_hickle4@yahoo.com",
    "phoneNumber": "222-255-5190",
    "address": "908 Jack Locks",
    "country": "Nepal",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Goyette and Sons",
    "isVerified": false,
    "status": "active",
    "role": "Full Stack Developer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b20",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_20.jpg",
    "name": "Ariana Lang",
    "email": "avery43@hotmail.com",
    "phoneNumber": "408-439-8033",
    "address": "908 Jack Locks",
    "country": "Saint Vincent and the Grenadines",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Feest Group",
    "isVerified": false,
    "status": "banned",
    "role": "Backend Developer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b21",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_21.jpg",
    "name": "Amiah Pruitt",
    "email": "olen_legros@gmail.com",
    "phoneNumber": "272-940-8266",
    "address": "908 Jack Locks",
    "country": "Greenland",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Bosco and Sons",
    "isVerified": true,
    "status": "active",
    "role": "UX Designer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b22",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_22.jpg",
    "name": "Harold Mcgrath",
    "email": "jimmie.gerhold73@hotmail.com",
    "phoneNumber": "812-685-8057",
    "address": "908 Jack Locks",
    "country": "Maldives",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Bartell - Kovacek",
    "isVerified": false,
    "status": "active",
    "role": "UI Designer"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b23",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_23.jpg",
    "name": "Esperanza Mcintyre",
    "email": "genevieve.powlowski@hotmail.com",
    "phoneNumber": "353-801-5212",
    "address": "908 Jack Locks",
    "country": "Comoros",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Schimmel - Raynor",
    "isVerified": false,
    "status": "banned",
    "role": "Project Manager"
}, {
    "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b24",
    "avatarUrl": "https://minimal-assets-api.vercel.app/assets/images/avatars/avatar_24.jpg",
    "name": "Mireya Conner",
    "email": "louie.kuphal39@gmail.com",
    "phoneNumber": "606-285-8928",
    "address": "908 Jack Locks",
    "country": "Bhutan",
    "state": "Virginia",
    "city": "Rancho Cordova",
    "zipCode": "85807",
    "company": "Tremblay LLC",
    "isVerified": true,
    "status": "active",
    "role": "UI/UX Designer"
}]

const TABLE_HEAD = [
    {id: 'name', label: 'Name', alignRight: false},
    {id: 'company', label: 'Company', alignRight: false},
    {id: 'role', label: 'Role', alignRight: false},
    {id: 'isVerified', label: 'Verified', alignRight: false},
    {id: 'status', label: 'Status', alignRight: false},
    {id: ''},
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return array.filter((_product) => _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}


const useStyles = makeStyles(theme => ({
    scrollbarContainer: {
        height: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        "& > div": {
            display: "flex",
            flexDirection: "column",
            flex: 1
        }
    }
}));

export const UsersList = () => {

    const theme = useTheme();

    const classes = useStyles();

    const [userList, setUserList] = useState([]);

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (checked) => {
        if (checked) {
            const newSelecteds = userList.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleDeleteUser = (userId) => {
        const deleteUser = userList.filter((user) => user.id !== userId);
        setSelected([]);
        setUserList(deleteUser);
    };

    const handleDeleteMultiUser = (selected) => {
        const deleteUsers = userList.filter((user) => !selected.includes(user.name));
        setSelected([]);
        setUserList(deleteUsers);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && Boolean(filterName);

    useEffect(() => {
        setTimeout(() => {
            setUserList(_userList);
        }, 1200);
    }, [])


    return <Box className={classes.scrollbarContainer}><Scrollbar sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        ".simplebar-content-wrapper": {
            // height: "100%",
            flex: 1,
            display: "flex",
            flexDirection: "column",
        },
        ".simplebar-content": {
            // height: "100%",
            flex: 1
        }
    }}>
        <Box sx={(theme: any) => ({
            flex: 1,
            display: "flex",
            position: "relative",
            flexDirection: "column",
            height: "100%"
        })}>
            <StickySubNavProvider sx={{ paddingBottom: 0 }}>
                <Box>
                    {/*<Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", px: theme.spacing(4) }}>*/}
                    {/*    <Box></Box>*/}
                    {/*    <Box></Box>*/}
                    {/*    <Button size={'large'} variant={"contained"}><Icon icon={'ion:add'} sx={{ mr: theme.spacing(2), width: '24px', height: '24px' }} /> Nutzer erstellen</Button>*/}
                    {/*</Box>*/}
                    <ListToolbar
                        leftElements={[<Button size={'large'} variant={"contained"}><Icon icon={'ion:add'} sx={{ mr: theme.spacing(2), width: '24px', height: '24px' }} /> Nutzer erstellen</Button>]}
                        numSelected={selected.length}
                        filterName={filterName}
                        onFilterName={handleFilterByName}
                        onDeleteUsers={() => handleDeleteMultiUser(selected)}
                    />
                    <TableContainer>
                        <Table p={0}  size="small">
                            <ListHead
                                sx={{ padding: '0px' }}
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={userList.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                        </Table>
                    </TableContainer>
                </Box>
            </StickySubNavProvider>


            <TableContainer sx={{flex: 1, width: "100%", height: "100%"}}>
                <Table size="small">
                    {/*<ListHead*/}
                    {/*    order={order}*/}
                    {/*    orderBy={orderBy}*/}
                    {/*    headLabel={TABLE_HEAD}*/}
                    {/*    rowCount={userList.length}*/}
                    {/*    numSelected={selected.length}*/}
                    {/*    onRequestSort={handleRequestSort}*/}
                    {/*    onSelectAllClick={handleSelectAllClick}*/}
                    {/*/>*/}
                    <TableBody>
                        {!!(userList.length === 0) && Array(30).fill(
                            <TableRow sx={{ background: "none !important", height: 40 }}>
                                {Array(TABLE_HEAD.length + 1).fill(
                                    <TableCell>
                                        <Skeleton variant="text" sx={{width: "100%", height: 16}}/>
                                    </TableCell>
                                )}
                            </TableRow>
                        )}
                        {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            const {id, name, role, status, company, avatarUrl, isVerified} = row;
                            const isItemSelected = selected.indexOf(name) !== -1;

                            return (
                                <TableRow
                                    hover
                                    key={id}
                                    tabIndex={-1}
                                    role="checkbox"
                                    selected={isItemSelected}
                                    aria-checked={isItemSelected}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox checked={isItemSelected} onClick={() => handleClick(name)}/>
                                    </TableCell>
                                    <TableCell sx={{display: 'flex', alignItems: 'center'}}>
                                        <Avatar alt={name} src={avatarUrl} sx={{mr: 2}}/>
                                        <Typography variant="subtitle2" noWrap>
                                            {name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left">{company}</TableCell>
                                    <TableCell align="left">{role}</TableCell>
                                    <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="left">
                                        <Label
                                            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                            color={(status === 'banned' && 'error') || 'success'}
                                        >
                                            {sentenceCase(status)}
                                        </Label>
                                    </TableCell>

                                    <TableCell align="right">
                                        <MoreMenu onDelete={() => handleDeleteUser(id)} userName={name}/>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{height: 53 * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
                    </TableBody>
                    {isNotFound && (
                        <TableBody>
                            <TableRow>
                                <TableCell align="center" colSpan={6} sx={{py: 3}}>
                                    <SearchNotFound searchQuery={filterName}/>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    )}
                </Table>
            </TableContainer>

            <TablePagination
                sx={{
                    position: "sticky",
                    zIndex: 999,
                    boxShadow: theme.customShadows.z24,
                    background: theme.palette.background.paper,
                    bottom: 0,
                    left: 0,
                    right: 0
                }}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={userList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e, page) => setPage(page)}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box> </Scrollbar></Box>

}