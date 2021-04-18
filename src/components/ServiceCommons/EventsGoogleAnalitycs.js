/** @format */
import ReactGA from 'react-ga'
ReactGA.initialize('G-V1CD33BQQ4')

const serviceEventGoogleAnalytics = async (item) => {
	ReactGA.event({
		category: item.category,
		action: item.action,
	})
}

export { serviceEventGoogleAnalytics }
