import {
    SET_DASHBOARDS,
    SET_CURRENT_DASHBOARD,
    DASHBOARDS_PLAY,
    DASHBOARDS_PAUSE,
    SET_DATE_RANGE,
} from '../actions/dashboardsActions'

export default function dashboards(
    state = {
        dashboards: [],
        current: 0,
        isPlaying: false,
        startDate: null,
        endDate: null,
    },
    action
) {
    switch (action.type) {
        case SET_DASHBOARDS:
            return {
                ...state,
                dashboards: action.dashboards,
            }

        case SET_CURRENT_DASHBOARD:
            return {
                ...state,
                current: action.index,
            }

        case DASHBOARDS_PLAY:
            return {
                ...state,
                isPlaying: true,
            }

        case DASHBOARDS_PAUSE:
            return {
                ...state,
                isPlaying: false,
            }

        case SET_DATE_RANGE:
            return {
                ...state,
                startDate: action.startDate,
                endDate: action.endDate,
            }

        default:
            return state
    }
}
