import {ComingSoonIllustration, Box, Typography} from 'my-lib';

export const ComingSoon = () => {
    return <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
        <Typography variant="h3" paragraph>
            Coming Soon!
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>We are currently working hard on this page!</Typography>

        <ComingSoonIllustration sx={{ my: 10, height: 240 }} />
    </Box>
};