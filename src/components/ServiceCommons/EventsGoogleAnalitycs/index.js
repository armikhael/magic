/** @format */
import ReactGA from 'react-ga'
ReactGA.initialize('UA-187711614-1')

const serviceEventGoogleAnalytics = async (item) => {
	ReactGA.event({
		category: item.category,
		action: item.action,
		label: item.label,
	})
}

export { serviceEventGoogleAnalytics }
