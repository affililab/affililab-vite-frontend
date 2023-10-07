import {useState} from "react"
import {Box, capitalCase, Container, Icon, Page, Tab, Tabs, useSettings} from "my-lib";
import {AccountGeneral, PasswordReset} from "@resources/User/components"

export default function () {
    const { themeStretch } = useSettings();

    const [currentTab, setCurrentTab] = useState('general');

    const ACCOUNT_TABS = [
        {
            value: 'general',
            icon: <Icon icon={'ic:round-account-box'} width={20} height={20} />,
            component: <AccountGeneral />,
        },
        {
            value: 'change_password',
            icon: <Icon icon={'ic:round-vpn-key'} width={20} height={20} />,
            component: <PasswordReset />,
        }
    ];

    return <>
        <Page title="Profile">
            <Container maxWidth={themeStretch ? false : 'xl'} sx={{ py: 8 }}>
                <Tabs
                    value={currentTab}
                    scrollButtons="auto"
                    variant="scrollable"
                    allowScrollButtonsMobile
                    onChange={(e, value) => setCurrentTab(value)}
                >
                    {ACCOUNT_TABS.map((tab) => (
                        <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
                    ))}

                </Tabs>

                <Box sx={{ mb: 5 }} />
                
                {ACCOUNT_TABS.map((tab) => {
                    const isMatched = tab.value === currentTab;
                    return isMatched && <Box key={tab.value}>{tab.component}</Box>;
                })}
            </Container>
        </Page>
    </>
}