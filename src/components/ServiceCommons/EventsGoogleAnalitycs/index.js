/** @format */
import ReactGA from 'react-ga'
ReactGA.initialize('UA-187711614-1')

const serviceEventGoogleAnalytics = async (item) => {
	ReactGA.event({
		action: item.action,
		category: item.category,
		label: item.label,
	})
}

export default serviceEventGoogleAnalytics
