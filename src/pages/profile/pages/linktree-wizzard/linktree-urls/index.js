/** @format */

import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { Form, Button, notification, Col, Card, Row, Divider } from 'antd'

import InputField from '../../../../../components/Form/Input'
import TextAreaField from '../../../../../components/Form/TextArea'
import UploadOneImage from '../../../../../components/UploadOneImage'

import { serviceGetData, serviceUpdateData } from './services'

export default function LinkTreeUrl(props) {
	const history = useHistory()
	const [form] = Form.useForm()
	const [data, setData] = useState()
	const [isModify, setIsModify] = useState(false)
	const [image, setImage] = useState(undefined)
	const [edit, setEdit] = useState(false)
	const [buttonText, setButtonText] = useState('Siguiente')

	const fetchData = async (param) => {
		const response = await serviceGetData(param)
		console.log('response', response.data[0])
		setData(response.data[0])
		setEdit(true)
	}

	useEffect(() => {
		if (props.match.params.modify) {
			setIsModify(true)
			setButtonText('Actualizar')
		}
		console.log(props.match.params.name)
		fetchData(props.match.params.name)
		console.log('useEffects')
	}, [props])

	const handleOnFinish = (item) => {}

	return <>hola</>
}
