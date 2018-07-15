import * as Moment from 'moment';
import { errorLocs } from '../errors';
import { seats, nameLocation } from '../whiteboard-constants';
import { IActiveRefsAndBlock, ISchedBlock } from '../types/WhiteboardTypes';
import { ISnivs, IDays, IFlights, ISorties, INotes, IEntity, ISettings, IElementBeingEdited } from '../types/State';
import { RGX_24HOUR_TIME, RGX_STARTS_WITH_TIME_BLOCK } from '../util/regEx';
import { conv24HrTimeToMoment } from '../types/utilFunctions';

export const getSchedFromFlightTimes = (currentDayId: string,
                                        flight: IFlights,
                                        settings: ISettings,
                                        note: INotes | null = null
): ISchedBlock => {
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
    let startOffset = flight.useExactTimes ? 0 : settings.minutesBeforeBrief * 60000;
    let endOffset = flight.useExactTimes
    ?   0
    :   flight.sim
    ?   settings.minutesAfterBoxTime * 60000
    :   settings.minutesAfterLand * 60000;
    const briefTime = flight.times.brief.replace(':', '');
    const takeoffTime = flight.times.takeoff.replace(':', '');
    const landTime = flight.times.land.replace(':', '');
    if (RGX_24HOUR_TIME.test(briefTime)) {
        startTimeHr = briefTime.slice(0, 2);
        startTimeMn = briefTime.slice(2, 4);
    } else if (RGX_24HOUR_TIME.test(takeoffTime)) {
        startTimeHr = takeoffTime.slice(0, 2);
        startTimeMn = takeoffTime.slice(2, 4);
        startOffset = flight.useExactTimes
            ?   0
            :   flight.sim
            ?   startOffset + (settings.minutesBriefToBoxTime * 60000)
            :   startOffset + (settings.minutesBriefToTakeoff * 60000);
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
    const location = flight.sim ?
        note ?
            errorLocs.SIM_NOTE :
            errorLocs.SIM :
        note ?
            errorLocs.FLIGHT_NOTE :
            errorLocs.FLIGHT;
    const schedBlock = {
        start: Moment(startDate.valueOf() - startOffset),
        end: Moment(endDate.valueOf() + endOffset),
        brief: conv24HrTimeToMoment(briefTime, currentDayId),
        hardStart: conv24HrTimeToMoment((startTimeHr + startTimeMn), currentDayId),
        hardEnd: conv24HrTimeToMoment(endTimeHr + endTimeMn, currentDayId),
        location, // : note ? errorLocs.FLIGHT_NOTE : errorLocs.FLIGHT,
        locationId: flight.id,
    };
    if (schedBlock.start > schedBlock.end) {
        const tempStart = schedBlock.start;
        schedBlock.start = schedBlock.end;
        schedBlock.end = tempStart;

        const tempHardStart = schedBlock.hardStart;
        schedBlock.hardStart = schedBlock.hardEnd;
        schedBlock.hardEnd = tempHardStart;
    }
    return schedBlock;
};

export const getSchedFromNotes = (currentDayId: string,
                                  note: INotes,
                                  settings: ISettings,
                                  flight: IFlights | null = null
): ISchedBlock => {
    /**
     * Gets referenced aircrew start and end times from notes.
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
            brief: null,
            hardStart: startDate,
            hardEnd: endDate,
            location: flight ? errorLocs.FLIGHT : errorLocs.DAY_NOTE,
            locationId: flight ? flight.id : currentDayId,
        };
        if (schedBlock.start > schedBlock.end) {
            const tempStart = schedBlock.start;
            schedBlock.start = schedBlock.end;
            schedBlock.end = tempStart;
        }
        return schedBlock;
    } else {
        if (flight) {
            return getSchedFromFlightTimes(currentDayId,
                                           flight,
                                           settings,
                                           note);
        } else {
            const schedBlock = {
                start: Moment(`${currentDayId} 00:00:00.000`, 'YYYY-MM-DD HH:mm:ss.SSS'),
                /** use 00 seconds to be able to compare this time to the actual end of the day */
                end: Moment(`${currentDayId} 23:59:00.000`, 'YYYY-MM-DD HH:mm:ss.SSS'),
                brief: null,
                hardStart: Moment(`${currentDayId} 00:00:00.000`, 'YYYY-MM-DD HH:mm:ss.SSS'),
                hardEnd: Moment(`${currentDayId} 23:59:00.000`, 'YYYY-MM-DD HH:mm:ss.SSS'),
                location: errorLocs.DAY_NOTE, // flight ? errorLocs.FLIGHT : errorLocs.DAY_NOTE,
                locationId: currentDayId, // flight ? flight.id : currentDayId,
            };
            if (schedBlock.start > schedBlock.end) {
                const tempStart = schedBlock.start;
                schedBlock.start = schedBlock.end;
                schedBlock.end = tempStart;
            }
            return schedBlock;
        }
    }
};

export const getSchedFromSnivs = (sniv: ISnivs,
                                  dayId: string
): ISchedBlock => {
    return {
        start: sniv.dates[dayId].start,
        end: sniv.dates[dayId].end,
        brief: null,
        hardStart: sniv.dates[dayId].start,
        hardEnd: sniv.dates[dayId].end,
        location: errorLocs.SNIVS,
        locationId: sniv.id,
    };
};

const getActiveAircrewRefs = (currentDayObject: IDays,
                              elementBeingEdited: IElementBeingEdited,
                              settings: ISettings,
                              flightsById: {[id: string]: IFlights},
                              sortiesById: {[id: string]: ISorties},
                              notesById: {[id: string]: INotes},
                              snivs: IEntity<ISnivs>
): IActiveRefsAndBlock => {
    /**
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
    const activeAircrewRefs = {};
    let activeTimeblock = null;
    let schedBlock;
    currentDayObject.flights.forEach(flightId => {
        flightsById[flightId].sorties.forEach(sortieId => {
            /** Set the timeblock for where the editor currently is */
            if ((elementBeingEdited.element === nameLocation.FRONT_SEAT_NAME ||
                 elementBeingEdited.element === nameLocation.BACK_SEAT_NAME) &&
                 elementBeingEdited.entityId === sortieId) {
                activeTimeblock = getSchedFromFlightTimes(currentDayObject.id,
                                                          flightsById[flightId],
                                                          settings);
            }
            seats.forEach(seat => {
                sortiesById[sortieId][seat].aircrewRefIds.forEach((aircrewId: string) => {
                    /** Get all the referenced aircrew from sorties in the current day */
                    schedBlock = getSchedFromFlightTimes(currentDayObject.id,
                                                         flightsById[flightId],
                                                         settings);
                    activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
                        [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
                });
            });
        });
        flightsById[flightId].notes.forEach(noteId => {
            /** Set the timeblock for where the editor currently is */
            if (elementBeingEdited.element === nameLocation.NOTE &&
                elementBeingEdited.entityId === noteId) {
                activeTimeblock = getSchedFromNotes(currentDayObject.id,
                                                    notesById[noteId],
                                                    settings,
                                                    flightsById[flightId]);
            }
            notesById[noteId].aircrewRefIds.forEach(aircrewId => {
                /** Get all the referenced aircrew from flight notes in the current day */
                schedBlock = getSchedFromNotes(currentDayObject.id,
                                                       notesById[noteId],
                                                       settings,
                                                       flightsById[flightId]);
                activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
                    [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
            });
        });
    });
    currentDayObject.notes.forEach(noteId => {
        /** Set the timeblock for where the editor currently is */
        if (elementBeingEdited.element === nameLocation.NOTE &&
            elementBeingEdited.entityId === noteId) {
            activeTimeblock = getSchedFromNotes(currentDayObject.id,
                                                notesById[noteId],
                                                settings);
        }
        notesById[noteId].aircrewRefIds.forEach(aircrewId => {
            /** Get all the referenced aircrew from day notes in the current day */
            schedBlock = getSchedFromNotes(currentDayObject.id,
                                           notesById[noteId],
                                           settings);
            activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
                [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
        });
    });
    snivs.allIds.forEach(snivId => {
        if (snivs.byId[snivId].dates[currentDayObject.id]) {
            snivs.byId[snivId].aircrewIds.forEach(aircrewId => {
                /** Get all the referenced aircrew from snivs in the current day */
                schedBlock = getSchedFromSnivs(snivs.byId[snivId],
                                               currentDayObject.id);
                activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
                    [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
                /** Don't set timeblock here. Snivs won't affect avail crew highlights. */
            });
        }
    });
    return {
        activeAircrewRefs,
        activeTimeblock,
    };
};

export default getActiveAircrewRefs;
