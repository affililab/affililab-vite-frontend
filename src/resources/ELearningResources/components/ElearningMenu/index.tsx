import {FC} from "react";
import {Box, Icon, CircularProgress, Typography} from "my-lib"
import {FilterNavSectionVertical} from "@components/FilterNavSectionVertical";
import {Search} from "@resources/ELearningResources/components/Search";
import {useGetAllWithNumbers} from "@resources/CampaignSupportCategory/hooks/useGetAllWithNumbers";

export const ElearningMenu: FC<any> = ({ searchValue, setSearchValue, updateSearch, activeCategories, setActiveCategories, sx }) => {

    const {items, loading} = useGetAllWithNumbers();

    const setActiveStates = (item) => {
        //insert or delete actives
        if (activeCategories.includes(item.key)) {
            setActiveCategories(activeCategories.filter(activeItem => activeItem !== item.key));
            return;
        }
        setActiveCategories([...activeCategories, item.key]);
    }

    const NAV_ITEMS = [
        {
            subheader: 'Kategorien',
            items: items ? items?.map(item => ({
                key: item.id,
                icon: <Icon icon={item.icon} />,
                title: item.title + " ("+item.totalELearningResources+")"
            })) : []
        }
    ];

    return (
        <Box
            sx={{
                py: 5,
                borderRadius: 'shape.borderRadius',
                maxWidth: 312,
                minWidth: 346,
                bgcolor: 'background.paper',
                boxShadow: 'customShadows.z24',
                ...sx
            }}
        >
            {/*<Box sx={(theme) => ({ ...theme.typography.overline, paddingLeft: (theme) => theme.spacing(4), display: "flex", alignItems: "center", gap: (theme) => theme.spacing(2) })}>*/}
            {/*    <Icon icon={'akar-icons:settings-horizontal'} width="32" height={"32"}/>*/}
            {/*    <Typography*/}
            {/*        variant="body2">Filter</Typography>*/}
            {/*</Box>*/}
            {/*<Box sx={{ paddingTop: (theme) => theme.spacing(2), paddingX: (theme) => theme.spacing(2) }}>*/}
            {/*    <Search searchValue={searchValue} setSearchValue={setSearchValue} updateInput={updateSearch} />*/}
            {/*</Box>*/}
            {loading ?
                <Box
                sx={{
                    height: "256px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                >
                    <CircularProgress />
                </Box> : <FilterNavSectionVertical navConfig={NAV_ITEMS} activeItems={activeCategories} setActiveStates={setActiveStates} />}
        </Box>
    );
}