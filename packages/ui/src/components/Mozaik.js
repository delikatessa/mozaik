import React, { Component } from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'
import styled, { injectGlobal } from 'styled-components'

import Dashboard, { DashboardPropType } from './dashboard/Dashboard'
import DashboardHeader from './dashboard/DashboardHeader'
import WidgetsRegistry from './../WidgetsRegistry'
import Settings from './settings/Settings'
import Notifications from '../containers/NotificationsContainer'

injectGlobal`
html,
body {
    margin: 0;
    height: 100%;
    width:  100%;
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

*,
*:before,
*:after {
    box-sizing: border-box;
}

a {
    color: inherit;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}

img {
    max-width: 100%;
    max-height: 100%;
}

svg {
    display: block;
}
`

const Root = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: ${props => props.theme.root.background};
    color: ${props => props.theme.colors.text};
    ${props => props.theme.root.extend.trim()};
`

export default class Mozaik extends Component {
    static propTypes = {
        fetchConfiguration: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        dashboards: PropTypes.arrayOf(DashboardPropType).isRequired,
        currentDashboard: PropTypes.number.isRequired,
        isPlaying: PropTypes.bool.isRequired,
        play: PropTypes.func.isRequired,
        pause: PropTypes.func.isRequired,
        previous: PropTypes.func.isRequired,
        next: PropTypes.func.isRequired,
        configuration: PropTypes.shape({}),
        themes: PropTypes.object.isRequired,
        currentTheme: PropTypes.string.isRequired,
        setTheme: PropTypes.func.isRequired,
        startDate: momentPropTypes.momentObj,
        endDate: momentPropTypes.momentObj,
        setDateRange: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)

        this.toggleSettings = this.toggleSettings.bind(this)

        this.state = {
            settingsOpened: false,
        }
    }

    setDateRange = dateRange => {
        this.props.setDateRange(dateRange)
    }

    toggleSettings() {
        const { settingsOpened } = this.state
        this.setState({ settingsOpened: !settingsOpened })
    }

    componentDidMount() {
        const { fetchConfiguration } = this.props
        fetchConfiguration()
    }

    render() {
        const {
            isLoading,
            dashboards,
            currentDashboard,
            isPlaying,
            play,
            pause,
            previous,
            next,
            themes,
            currentTheme,
            setTheme,
            startDate,
            endDate,
        } = this.props

        const { settingsOpened } = this.state

        let content = <div>loading</div>
        if (!isLoading && dashboards.length > 0) {
            content = (
                <Dashboard
                    dashboard={dashboards[currentDashboard]}
                    dashboardIndex={currentDashboard}
                    registry={WidgetsRegistry}
                    startDate={startDate}
                    endDate={endDate}
                />
            )
        }

        return (
            <Root>
                <DashboardHeader
                    settingsOpened={settingsOpened}
                    toggleSettings={this.toggleSettings}
                    dashboards={dashboards}
                    currentDashboardIndex={currentDashboard}
                    isPlaying={isPlaying}
                    play={play}
                    pause={pause}
                    previous={previous}
                    next={next}
                    setDateRange={this.setDateRange}
                    startDate={startDate}
                    endDate={endDate}
                />
                {content}
                <Settings
                    themes={themes}
                    currentTheme={currentTheme}
                    setTheme={setTheme}
                    opened={settingsOpened}
                    close={this.toggleSettings}
                />
                <Notifications />
            </Root>
        )
    }
}
