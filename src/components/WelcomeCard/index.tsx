import {
    MotivationIllustration,
    styled,
    Typography,
    Button,
    Card,
    CardContent,
    useAuth
} from 'my-lib';

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    backgroundColor: theme.palette.primary.lighter,
    [theme.breakpoints.up('md')]: {
        height: '100%',
        display: 'flex',
        textAlign: 'left',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
}));

export default function WelcomeCard() {
    const { user } = useAuth();
    return (
        <RootStyle>
            <CardContent
                sx={{
                    color: 'grey.800',
                    p: { md: 0 },
                    pl: { md: 5 }
                }}
            >
                <Typography gutterBottom variant="h4">
                    Congratulations,
                    <br /> {user.name}
                </Typography>

                <Typography variant="body2" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
                    Best seller of the month You have done 57.6% more sales today.
                </Typography>

                <Button variant="contained">Go Now</Button>
            </CardContent>

            <MotivationIllustration
                sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' }
                }}
            />
        </RootStyle>
    );
}
