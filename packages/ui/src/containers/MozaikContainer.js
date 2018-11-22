import { connect } from 'react-redux'
import Mozaik from '../components/Mozaik'
import { fetchConfiguration } from '../actions/configurationActions'
import { play, pause, previous, next, setDateRange } from '../actions/dashboardsActions'
import { setTheme } from '../actions/themesActions'

const mapStateToProps = state => {
    const {
        configuration,
        dashboards: { dashboards, current, isPlaying, startDate, endDate },
        themes: { themes, current: currentTheme },
    } = state

    return {
        ...configuration,
        dashboards,
        currentDashboard: current,
        isPlaying,
        themes,
        currentTheme,
        startDate,
        endDate,
    }
}

const mapDispatchToProps = {
    fetchConfiguration,
    play,
    pause,
    previous,
    next,
    setTheme: theme => setTheme(theme),
    setDateRange: dates => setDateRange(dates),
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Mozaik)
