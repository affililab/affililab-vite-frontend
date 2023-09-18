import React, {FC} from "react";
import {IconButton, Icon, InputAdornment, TextField} from "my-lib";

export const Search: FC<any> = ({searchValue, setSearchValue, updateInput}) => {
    return  <TextField
        value={searchValue}
        onChange={(e) => updateInput(e.target.value)}
        size="small"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <Icon icon={'akar-icons:search'}/>
                </InputAdornment>
            ),
            endAdornment: searchValue && (
                <InputAdornment position="end">
                    <IconButton onClick={() => {
                        updateInput("")
                    }}>
                        <Icon icon={'eva:close-fill'}/>
                    </IconButton>
                </InputAdornment>
            )
        }}
        placeholder="Suche ..."
    />
}