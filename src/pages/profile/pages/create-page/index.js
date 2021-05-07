/** @format */

import React from 'react'
import { useSelector } from 'react-redux'
import FormPage from '../../components/FormPage'

const CreatePage = () => {
	const interfacePage = useSelector((store) => store.page)

	return (
		<>
			<ul>
				<FormPage data={interfacePage}></FormPage>
				<li>
					<button
						onClick={() => {
							console.log(interfacePage)
						}}>
						Revisar State
					</button>
				</li>
			</ul>
		</>
	)
}

export default CreatePage
