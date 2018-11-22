import React, { Component } from 'react'
import PropTypes from 'prop-types'
import momentPropTypes from 'react-moment-proptypes'
import styled, { withTheme } from 'styled-components'
import { NavButton } from 'react-svg-buttons'
import { DashboardPropType } from './Dashboard'
import DashboardTitle from './DashboardTitle'
import DashboardPlayer from './DashboardPlayer'
import typography from '../../theming/typography'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'

const Header = styled.header`
    position: absolute;
    z-index: 200;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    overflow: visible;
    height: ${props => props.theme.dashboard.header.height};
    padding: ${props => props.theme.dashboard.header.padding};
    background: ${props => props.theme.dashboard.header.background};
    color: ${props => props.theme.dashboard.header.color};
    box-shadow: ${props => props.theme.dashboard.header.boxShadow};
`

const TitleWrapper = styled.div`
    flex-grow: 1;
    margin-right: 4vmin;
    height: 6vmin;
    ${props => typography(props.theme, 'display')};
`

const Toogle = styled.div`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2vmin;
`

class DashboardHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            focusedInput: null,
            startDate: null,
            endDate: null,
        }
    }

    static propTypes = {
        settingsOpened: PropTypes.bool.isRequired,
        toggleSettings: PropTypes.func.isRequired,
        dashboards: PropTypes.arrayOf(DashboardPropType).isRequired,
        currentDashboardIndex: PropTypes.number.isRequired,
        isPlaying: PropTypes.bool.isRequired,
        play: PropTypes.func.isRequired,
        previous: PropTypes.func.isRequired,
        next: PropTypes.func.isRequired,
        pause: PropTypes.func.isRequired,
        theme: PropTypes.object.isRequired,
        setDateRange: PropTypes.func.isRequired,
        startDate: momentPropTypes.momentObj,
        endDate: momentPropTypes.momentObj,
    }

    render() {
        const {
            dashboards,
            currentDashboardIndex,
            isPlaying,
            play,
            pause,
            previous,
            next,
            settingsOpened,
            toggleSettings,
            theme,
            setDateRange,
        } = this.props

        let title = 'Mozaïk'
        if (dashboards.length) {
            const dashboard = dashboards[currentDashboardIndex]
            if (dashboard.title !== undefined) {
                title = dashboard.title
            }
        }

        return (
            <Header>
                <TitleWrapper>
                    <DashboardTitle currentDashboardIndex={currentDashboardIndex} title={title} />
                </TitleWrapper>
                <DateRangePicker
                    startDateId="startDate"
                    endDateId="endDate"
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    onDatesChange={({ startDate, endDate }) => {
                        this.setState({ startDate, endDate })
                        setDateRange({ startDate, endDate })
                    }}
                    focusedInput={this.state.focusedInput}
                    onFocusChange={focusedInput => {
                        this.setState({ focusedInput })
                    }}
                    showClearDates={true}
                    noBorder={true}
                    isOutsideRange={() => false}
                />
                {dashboards.length && dashboards.length > 1 && (
                    <DashboardPlayer
                        dashboards={dashboards}
                        currentDashboardIndex={currentDashboardIndex}
                        isPlaying={isPlaying}
                        play={play}
                        pause={pause}
                        previous={previous}
                        next={next}
                    />
                )}
                <Toogle onClick={toggleSettings} className="Dashboard__Header__Toggle">
                    <NavButton
                        direction="down"
                        opened={settingsOpened}
                        size={32}
                        color={theme.colors.icon}
                    />
                </Toogle>
            </Header>
        )
    }
}

export default withTheme(DashboardHeader)
