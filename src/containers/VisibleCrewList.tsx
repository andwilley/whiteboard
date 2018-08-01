import { connect } from 'react-redux';
import CrewList from '../components/CrewList';
import {
  IState,
  IAircrew,
  IFilters,
  IGroups } from '../types/State';
import { getAllAircrew, getAllGroups, getFilters } from '../reducers';
import { createSelector } from 'reselect';

const getFilteredAircrew = createSelector(
  getAllAircrew,
  getAllGroups,
  getFilters,
  (aircrewList: IAircrew[], groups: IGroups[], filters: IFilters): IAircrew[] => {
  // slices of the state this needs for future optimization reference:
  // state.aircrew
  // state.crewListUI.filters
  const filteredAircrew = aircrewList.filter((crew: IAircrew) => {
    if (filters.qualFilter.length === 0 &&
        filters.groupFilter.length === 0 &&
        filters.rankFilter.length === 0 &&
        filters.crewSearchInput === '' &&
        filters.showAvailable === false) {
        return true;
    }
    /** filter out aircrew without selected quals */
    if (filters.qualFilter.length > 0) {
        let allQualsMatch = true;
        filters.qualFilter.forEach((qual: string) => {
            if (crew.quals.indexOf(qual) === -1) {
                allQualsMatch = false;
            }
        });
        if (!allQualsMatch) {
            return false;
        }
    }
    /** filter out aircrew that aren't in the selected group */
    if (filters.groupFilter.length > 0) {
        let allGroupsMatch = true;
        filters.groupFilter.forEach((group: string) => {
          groups.forEach(grp => {
            console.log(`groupName: ${grp} loopGroup: ${group}`);
            if (grp.name === group && grp.aircrewIds.indexOf(crew.id) === -1) {
              allGroupsMatch = false;
            }
          });
        });
        if (!allGroupsMatch) {
            return false;
        }
    }
    /** filter out aircrew that aren't the selected rank */
    if (filters.rankFilter.length > 0) {
      let matchRank = false;
      filters.rankFilter.forEach((rank: number) => {
        if (crew.rank === rank) {
          matchRank = true;
        }
      });
      if (!matchRank) {
        return false;
      }
    }
    /** filter based on the search bar input for the crew list */
    const crewSearchInput = filters.crewSearchInput.toLowerCase();
    if (crewSearchInput !== '') {
      const callsign = crew.callsign.toLowerCase();
      const first = crew.first.toLowerCase();
      const last = crew.last.toLowerCase();
      const searchMatch = callsign.includes(crewSearchInput) ||
                          first.includes(crewSearchInput) ||
                          `${first} ${last}`.includes(crewSearchInput) ||
                          `${last} ${first}`.includes(crewSearchInput) ||
                          `${last}, ${first}`.includes(crewSearchInput);
      if (!searchMatch) {
        return false;
      }
    }
    /** return false for any aircrew that are scheduled (other than a sniv) */
    // if (filters.showUnscheduled && aircrewDayPucks[aircrewId]) {
    //   for (const key of Object.keys(aircrewDayPucks[aircrewId])) {
    //     if (aircrewDayPucks[aircrewId][key] > 0) {
    //       return false;
    //     }
    //   }
    // }
    return true;
  });
  return filteredAircrew;
});

const mapStateToProps = (state: IState) => {
  const aircrewList = getFilteredAircrew(state);
  return {
    aircrewList,
  };
};

const VisibleCrewList = connect(
  mapStateToProps
)(CrewList);

export default VisibleCrewList;
