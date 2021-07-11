/** @format */

import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Layout } from 'antd'

import Loading from '../../components/Loading/Loading'
import ListMasonry from '../../components/ListMasonry/'
import PageError from '../../components/Errors/PageError'
import Filters from '../../components/Filters'
import serviceEventGoogleAnalytics from '../../components/ServiceCommons/EventsGoogleAnalitycs'

import './style.css'
import { serviceGetData } from './services'

const { Content } = Layout

const Search = (props) => {
	const [list, setList] = useState([])
	const [page, setPage] = useState(1)
	const [hasMore] = useState(true)
	const [orderBy, setOrderBy] = useState('descViews')
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const { search } = useLocation()
	const query = queryString.parse(search)
	useEffect(() => {
		const query = queryString.parse(search)
		console.log('useEffect', query)
		serviceGetData({ query: query, page: page, sort: orderBy }).then((response) => {
			console.log(response)
			if (response.statusCode === 200) {
				setList([...list, ...response.data])
				setPage(page + 1)
				setLoading(false)
			} else {
				setLoading(false)
				setError(response)
			}
		})
		console.log('useEffect')
		setLoading(false)
	}, [props])

	const handleMenuClick = (item) => {}
	if (loading) {
		return <Loading />
	}
	if (error) {
		return <PageError detailError={error} />
	}
	return (
		<>
			<Content className='cv-container-main'>
				<Filters section='Refinando Búsqueda' handleMenuClick={handleMenuClick}></Filters>
				<InfiniteScroll dataLength={list.length} hasMore={hasMore} loader={<center></center>}>
					<ListMasonry listMasonry={list} />
				</InfiniteScroll>
			</Content>
		</>
	)
}

export default Search
