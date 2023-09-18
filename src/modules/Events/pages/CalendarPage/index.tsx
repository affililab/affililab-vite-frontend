import React, { useState, useRef  } from "react";
import {
    useSettings,
    Page,
    Container,
    Card,
    CalendarToolbar,
    CalendarStyle,
    FullCalendar,
    listPlugin,
    dayGridPlugin,
    timeGridPlugin,
    timelinePlugin,
    interactionPlugin,
    useResponsive
} from "my-lib";

const events = [
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
        "allDay": false,
        "textColor": "#00AB55",
        "description": "Atque eaque ducimus minima distinctio velit. Laborum et veniam officiis. Delectus ex saepe hic id laboriosam officia. Odit nostrum qui illum saepe debitis ullam. Laudantium beatae modi fugit ut. Dolores consequatur beatae nihil voluptates rem maiores.",
        "start": "2022-08-16T07:30:26.107Z",
        "end": "2022-08-16T09:00:26.107Z",
        "title": "Believing These 7 Myths About Event Keeps You From Growing"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3",
        "allDay": false,
        "textColor": "#1890FF",
        "description": "Rerum eius velit dolores. Explicabo ad nemo quibusdam. Voluptatem eum suscipit et ipsum et consequatur aperiam quia. Rerum nulla sequi recusandae illum velit quia quas. Et error laborum maiores cupiditate occaecati.",
        "start": "2022-08-22T02:00:26.107Z",
        "end": "2022-08-22T05:30:26.107Z",
        "title": "Don't Waste Time! 7 Facts Until You Reach Your Event"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4",
        "allDay": false,
        "textColor": "#54D62C",
        "description": "Et non omnis qui. Qui sunt deserunt dolorem aut velit cumque adipisci aut enim. Nihil quis quisquam nesciunt dicta nobis ab aperiam dolorem repellat. Voluptates non blanditiis. Error et tenetur iste soluta cupiditate ratione perspiciatis et. Quibusdam aliquid nam sunt et quisquam non esse.",
        "start": "2022-08-31T08:00:26.107Z",
        "end": "2022-08-31T12:00:26.107Z",
        "title": "How 7 Things Will Change The Way You Approach Event"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5",
        "allDay": false,
        "textColor": "#00AB55",
        "description": "Nihil ea sunt facilis praesentium atque. Ab animi alias sequi molestias aut velit ea. Sed possimus eos. Et est aliquid est voluptatem.",
        "start": "2022-08-28T08:00:26.107Z",
        "end": "2022-08-28T12:00:26.107Z",
        "title": "Event Awards: 7 Reasons Why They Don't Work & What You Can Do About It"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6",
        "allDay": false,
        "textColor": "#FFC107",
        "description": "Non rerum modi. Accusamus voluptatem odit nihil in. Quidem et iusto numquam veniam culpa aperiam odio aut enim. Quae vel dolores. Pariatur est culpa veritatis aut dolorem.",
        "start": "2022-08-31T05:15:26.107Z",
        "end": "2022-08-31T05:30:26.107Z",
        "title": "Event Doesn't Have To Be Hard. Read These 7 Tips"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b7",
        "allDay": true,
        "textColor": "#FF4842",
        "description": "Est enim et sit non impedit aperiam cumque animi. Aut eius impedit saepe blanditiis. Totam molestias magnam minima fugiat.",
        "start": "2022-08-24T16:59:59.999Z",
        "end": "2022-08-24T17:00:00.000Z",
        "title": "Event Is Your Worst Enemy. 7 Ways To Defeat It"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b8",
        "allDay": false,
        "textColor": "#04297A",
        "description": "Unde a inventore et. Sed esse ut. Atque ducimus quibusdam fuga quas id qui fuga.",
        "start": "2022-08-31T07:45:26.107Z",
        "end": "2022-08-31T07:50:26.107Z",
        "title": "Event On A Budget: 7 Tips From The Great Depression"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b9",
        "allDay": false,
        "textColor": "#1890FF",
        "description": "Eaque natus adipisci soluta nostrum dolorem. Nesciunt ipsum molestias ut aliquid natus ut omnis qui fugiat. Dolor et rem. Ut neque voluptatem blanditiis quasi ullam deleniti.",
        "start": "2022-08-31T08:50:26.107Z",
        "end": "2022-08-31T08:55:26.107Z",
        "title": "Knowing These 7 Secrets Will Make Your Event Look Amazing"
    },
    {
        "id": "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b10",
        "allDay": false,
        "textColor": "#7A0C2E",
        "description": "Nam et error exercitationem qui voluptate optio. Officia omnis qui accusantium ipsam qui. Quia sequi nulla perspiciatis optio vero omnis maxime omnis ipsum. Perspiciatis consequuntur asperiores veniam dolores.",
        "start": "2022-09-03T07:12:26.107Z",
        "end": "2022-09-05T07:20:26.107Z",
        "title": "Master The Art Of Event With These 7 Tips"
    }
];

export default function () {
    const {themeStretch} = useSettings();
    const calendarRef = useRef(null);
    const isDesktop = useResponsive('up', 'sm');

    const [date, setDate] = useState(new Date());
    const [view, setView] = useState(isDesktop ? 'dayGridMonth' : 'listWeek');

    const handleClickToday = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    };

    const handleChangeView = (newView) => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.changeView(newView);
            setView(newView);
        }
    };

    const handleClickDatePrev = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    };

    const handleClickDateNext = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    };

    const handleSelectRange = (arg) => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.unselect();
        }
    };

    const handleSelectEvent = (arg) => {
        // dispatch(selectEvent(arg.event.id));
    };

    const handleResizeEvent = async ({ event }) => {
        try {
            console.log(
                event.id, {
                    allDay: event.allDay,
                    start: event.start,
                    end: event.end,
                }
            );
            // dispatch(
            //     updateEvent(event.id, {
            //         allDay: event.allDay,
            //         start: event.start,
            //         end: event.end,
            //     })
            // );
        } catch (error) {
            console.error(error);
        }
    };

    const handleDropEvent = async ({ event }) => {
        console.log("drop event", event.id, {
            allDay: event.allDay,
            start: event.start,
            end: event.end,
        });
        try {
            // dispatch(
            //     updateEvent(event.id, {
            //         allDay: event.allDay,
            //         start: event.start,
            //         end: event.end,
            //     })
            // );
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddEvent = () => {
        // dispatch(openModal());
    };

    const handleCloseModal = () => {
        // dispatch(closeModal());
    };

    return <Page title="Events">
        <Container sx={(theme) => ({ display: "flex", flexDirection: "column", flex: 1, height: "100%", paddingBottom: theme.spacing(2) })} maxWidth={themeStretch ? false : 'xxl'}>
                <CalendarStyle sx={{ display: "flex", flexDirection: "column", flex: 1, height: "100%" }}>
                    <CalendarToolbar
                        date={date}
                        view={view}
                        onNextDate={handleClickDateNext}
                        onPrevDate={handleClickDatePrev}
                        onToday={handleClickToday}
                        onChangeView={handleChangeView}
                    />
                    <Card sx={{ display: "flex", flexDirection: "column", flex: 1, height: "100%" }}>
                    <FullCalendar
                        weekends
                        editable
                        droppable
                        selectable
                        events={events}
                        ref={calendarRef}
                        rerenderDelay={10}
                        initialDate={date}
                        initialView={view}
                        dayMaxEventRows={3}
                        eventDisplay="block"
                        headerToolbar={false}
                        allDayMaintainDuration
                        eventResizableFromStart
                        select={handleSelectRange}
                        eventDrop={handleDropEvent}
                        eventClick={handleSelectEvent}
                        eventResize={handleResizeEvent}
                        plugins={[listPlugin, dayGridPlugin, timelinePlugin, timeGridPlugin, interactionPlugin]}
                    />            </Card>
                </CalendarStyle>

        </Container>
    </Page>
}