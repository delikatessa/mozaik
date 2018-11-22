import { connect } from 'react-redux'
import WidgetWrapper from '../components/widget/WidgetWrapper'

const mapStateToProps = (state, { subscriptionId: id }) => {
    const {
        themes: { current: themeId },
        dashboards: { startDate, endDate },
    } = state

    let apiData
    let apiError

    if (id) {
        if (state.api.get('data').has(id)) {
            apiData = state.api.get('data').get(id)
        }
        if (state.api.get('errors').has(id)) {
            apiError = state.api.get('errors').get(id)
        }
    }

    return {
        // not used but needed to force refresh of context
        themeId,
        apiData,
        apiError,
        startDate,
        endDate,
    }
}

export default connect(mapStateToProps)(WidgetWrapper)
