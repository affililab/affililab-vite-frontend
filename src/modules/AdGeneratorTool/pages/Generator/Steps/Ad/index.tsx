import {Box, Container, TextField, Typography} from "my-lib";
import React, {FC} from "react";

type AdProps = {
    generatedAd?: {
        generatedTitle: string;
        generatedText: string;
    } | null;
};

export const Ad : FC<AdProps> = ({ generatedAd }) => {
    return <Container sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: 4, flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Box>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                    Title
                </Typography>
                <TextField sx={{ width: 512 }} placeholder={'title 1'} value={generatedAd?.generatedTitle} />
            </Box>
            <Box>
                <Typography variant={'subtitle2'} sx={{ marginBottom: 2 }}>
                    Copy
                </Typography>
                <TextField
                    value={generatedAd?.generatedText}
                    sx={{ width: 512 }}
                    id="outlined-multiline-flexible"
                    label="Multiline"
                    multiline
                    minRows={4}
                    maxRows={12}
                />
            </Box>
        </Box>
    </Container>
};