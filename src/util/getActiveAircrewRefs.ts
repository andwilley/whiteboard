import * as Moment from 'moment';
import { errorLocs } from '../errors';
import { seats } from '../whiteboard-constants';
import { ISchedObject } from '../types/WhiteboardTypes';
import { ISnivs, IDays, IFlights, ISorties, INotes, IEntity, ISettings } from '../types/State';
import { RGX_24HOUR_TIME, RGX_STARTS_WITH_TIME_BLOCK } from '../util/regEx';

const getSchedFromFlightTimes = (activeAircrewRefs: ISchedObject,
                                 currentDayId: string,
                                 flight: IFlights,
                                 aircrewId: string,
                                 settings: ISettings
): ISchedObject => {
    /**
     * Assumes worst case for flights unless we can deduce it from the settings.
     * Crew in the seat for a sortie are assumed to be busy from brief to land with an offset on
     * either end (default 60 min) to account for prep and debrief.
     * If no brief time is given, its assumed to be the standard time from brief to takeoff (default
     * is 120 minutes) plus the offset. If no takeoff time is given, assume flight starts at 0000.
     * If no land time is given, assume flight lands at 2359. (may be smart to use a standard flight
     * duration for this, so we can go past midnight if thats when the flight takes off)
     *
     * NEEDS:
     * state.settings
     * state.flights
     * state.crewListUI.currentDay
     */
    let startTimeHr, startTimeMn, endTimeHr, endTimeMn;
    let startOffset = settings.minutesBeforeBrief * 60000;
    let endOffset = settings.minutesAfterLand * 60000;
    const briefTime = flight.times.brief.replace(':', '');
    const takeoffTime = flight.times.takeoff.replace(':', '');
    const landTime = flight.times.land.replace(':', '');
    if (RGX_24HOUR_TIME.test(briefTime)) {
        startTimeHr = briefTime.slice(0, 2);
        startTimeMn = briefTime.slice(2, 4);
    } else if (RGX_24HOUR_TIME.test(takeoffTime)) {
        startTimeHr = takeoffTime.slice(0, 2);
        startTimeMn = takeoffTime.slice(2, 4);
        startOffset += settings.minutesBriefToTakeoff * 60000;
    } else {
        startTimeHr = '00';
        startTimeMn = '00';
        startOffset = 0;
    }
    if (RGX_24HOUR_TIME.test(landTime)) {
        endTimeHr = landTime.slice(0, 2);
        endTimeMn = landTime.slice(2, 4);
    } else {
        endTimeHr = '23';
        endTimeMn = '59';
        endOffset = 0;
    }
    const startDate = Moment(`${currentDayId} ${startTimeHr}:${startTimeMn}:00.000`,
                             'YYYY-MM-DD HH:mm:ss.SSS');
    const endDate = Moment(`${currentDayId} ${endTimeHr}:${endTimeMn}:00.000`,
                           'YYYY-MM-DD HH:mm:ss.SSS');
    const schedBlock = {
        start: Moment(startDate.valueOf() - startOffset),
        end: Moment(endDate.valueOf() + endOffset),
        location: errorLocs.FLIGHT,
        locationId: flight.id,
    };
    if (schedBlock.start > schedBlock.end) {
        const tempStart = schedBlock.start;
        schedBlock.start = schedBlock.end;
        schedBlock.end = tempStart;
    }
    activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
        [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
    return activeAircrewRefs;
};

const getSchedFromNotes = (activeAircrewRefs: ISchedObject,
                           currentDayId: string,
                           note: INotes,
                           aircrewId: string,
                           settings: ISettings,
                           flight: IFlights | null = null
): ISchedObject => {
    /**
     * Gets referenced aircrew start and end times from notes.
     * @returns {ISchedObject}
     * if times were specified, uses those. if start time but no end time, uses land time.
     * If no land time, uses stardard note duration (default 60 min).
     * If times aren't specified, uses flight times in the same way as above.
     * If flightNote is false, skips using flight times, defaults to length.
     *
     * NEEDS:
     * state.notes
     * state.flights
     * state.settings
     * state.crewListUI.currentDay
     */
    const noteTimes = RGX_STARTS_WITH_TIME_BLOCK.exec(note.content);
    let startTimeHr, startTimeMn, endTimeHr, endTimeMn;
    let endOffset = 0;
    if (noteTimes) {
        const startTime = noteTimes[1].replace(':', '');
        startTimeHr = startTime.slice(0, 2);
        startTimeMn = startTime.slice(2, 4);
        if (noteTimes[2]) {
            const endTime = noteTimes[2].replace(':', '');
            endTimeHr = endTime.slice(0, 2);
            endTimeMn = endTime.slice(2, 4);
        } else if (flight &&
            RGX_24HOUR_TIME.test(flight.times.land) &&
            flight.times.land > startTime) {
            endTimeHr = flight.times.land.slice(0, 2);
            endTimeMn = flight.times.land.slice(2, 4);
        } else {
            endOffset = settings.minutesNoteDuration * 60000;
        }
        const startDate = Moment(`${currentDayId} ${startTimeHr}:${startTimeMn}:00.000`,
                                 'YYYY-MM-DD HH:mm:ss.SSS');
        const endDate = endOffset === 0 ?
            /** use 00 seconds to be able to compare this time to the actual end of the day */
            Moment(`${currentDayId} ${endTimeHr}:${endTimeMn}:00.000`, 'YYYY-MM-DD HH:mm:ss.SSS') :
            Moment(startDate.valueOf() + endOffset);
        const schedBlock = {
            start: startDate,
            end: endDate,
            location: flight ? errorLocs.FLIGHT : errorLocs.DAY_NOTE,
            locationId: flight ? flight.id : currentDayId,
        };
        if (schedBlock.start > schedBlock.end) {
            const tempStart = schedBlock.start;
            schedBlock.start = schedBlock.end;
            schedBlock.end = tempStart;
        }
        activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
            [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
    } else {
        if (flight) {
            activeAircrewRefs = getSchedFromFlightTimes(activeAircrewRefs,
                                                        currentDayId,
                                                        flight,
                                                        aircrewId,
                                                        settings);
        } else {
            const schedBlock = {
                start: Moment(`${currentDayId} 00:00:00.000`, 'YYYY-MM-DD HH:mm:ss.SSS'),
                /** use 00 seconds to be able to compare this time to the actual end of the day */
                end: Moment(`${currentDayId} 23:59:00.000`, 'YYYY-MM-DD HH:mm:ss.SSS'),
                location: errorLocs.DAY_NOTE, // flight ? errorLocs.FLIGHT : errorLocs.DAY_NOTE,
                locationId: currentDayId, // flight ? flight.id : currentDayId,
            };
            if (schedBlock.start > schedBlock.end) {
                const tempStart = schedBlock.start;
                schedBlock.start = schedBlock.end;
                schedBlock.end = tempStart;
            }
            activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
                [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
        }
    }
    return activeAircrewRefs;
};

const getSchedFromSnivs = (activeAircrewRefs: ISchedObject, sniv: ISnivs, dayId: string): ISchedObject => {
    sniv.aircrewIds.forEach(aircrewId => {
        const schedBlock = {
            start: sniv.dates[dayId].start,
            end: sniv.dates[dayId].end,
            location: errorLocs.SNIVS,
            locationId: sniv.id,
        };
        activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
            [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
    });
    return activeAircrewRefs;
};

const getActiveAircrewRefs = (currentDayObject: IDays,
                              settings: ISettings,
                              flightsById: {[id: string]: IFlights},
                              sortiesById: {[id: string]: ISorties},
                              notesById: {[id: string]: INotes},
                              snivs: IEntity<ISnivs>
): ISchedObject => {
    /**
     * @param {IState} state The application state (store.getState())
     * @returns {object} keyed by aircrewId with values set to an array of the timespans associated with each ref
     * This checks all the places aircrew Ids can be referenced in the current day, aggregates them into an object and
     * includes the times they are scheduled for, so we can check for conflicts in another function.
     * Looks for names in:
     * state.days.byId[currentDay].flights (to find flights)
     *  for each state.flights.byId[flightId].sorties (to find sorties)
     *   for each state.sorites.byId[sortieId].front/back (to read the seats)
     *  for each state.flights.byId[fligthId].notes (to find flight notes)
     * state.days.byId[currentDay].notes (to find day notes)
     * state.notes.byId[.allIds] (to read the notes)
     * NEEDS:
     * state.crewListUI.currentDay
     * state.days
     * state.flights
     * state.sorties
     * state.notes
     * state.snivs
     *
     * Optimization: as it is, this will run EVERY TIME THE STATE CHANGES, even if memoized.
     * For sure, just passing the needed slices will make the app faster. That way, for example, if crewList is
     * updated, this won't recalc. As of now, it will. However...
     * If all that changes is the one currently active value... it still updates because the value changed in
     * the state, even though an aircrewRef may not have changed. We update the aircrew ref every time anyway, so even
     * if a it is the same by value, it will be shallow compared and not the same every time in reselect.
     * We could break this up by section, get sorties, flight notes and day notes separately, so if say flight Notes
     * change, we don't have to recompute all the other ones, but we'd still have to go all the way through flight
     * Notes...
     */
    let activeAircrewRefs = {};
    currentDayObject.flights.forEach(flightId => {
        flightsById[flightId].sorties.forEach(sortieId => {
            seats.forEach(seat => {
                sortiesById[sortieId][seat].aircrewRefIds.forEach((aircrewId: string) => {
                    /** Get all the referenced aircrew from sorties in the current day */
                    activeAircrewRefs = getSchedFromFlightTimes(activeAircrewRefs,
                                                                currentDayObject.id,
                                                                flightsById[flightId],
                                                                aircrewId,
                                                                settings);
                });
            });
        });
        flightsById[flightId].notes.forEach(noteId => {
            notesById[noteId].aircrewRefIds.forEach(aircrewId => {
                /** Get all the referenced aircrew from flight notes in the current day */
                activeAircrewRefs = getSchedFromNotes(activeAircrewRefs,
                                                      currentDayObject.id,
                                                      notesById[noteId],
                                                      aircrewId,
                                                      settings,
                                                      flightsById[flightId]);
            });
        });
    });
    currentDayObject.notes.forEach(noteId => {
        notesById[noteId].aircrewRefIds.forEach(aircrewId => {
            /** Get all the referenced aircrew from day notes in the current day */
            activeAircrewRefs = getSchedFromNotes(activeAircrewRefs,
                                                  currentDayObject.id,
                                                  notesById[noteId],
                                                  aircrewId,
                                                  settings);
        });
    });
    snivs.allIds.forEach(snivId => {
        if (snivs.byId[snivId].dates[currentDayObject.id]) {
            /** Get all the referenced aircrew from snivs in the current day */
            activeAircrewRefs = getSchedFromSnivs(activeAircrewRefs,
                                                  snivs.byId[snivId],
                                                  currentDayObject.id);
        }
    });
    return activeAircrewRefs;
};

export default getActiveAircrewRefs;
