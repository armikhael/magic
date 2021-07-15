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

import './style.css'
import { serviceGetData } from './services'

const { Content } = Layout

const Search = (props) => {
	const [list, setList] = useState([])
	const [page, setPage] = useState(1)
	const [hasMore] = useState(true)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(false)
	const { search } = useLocation()
	const [query] = useState(queryString.parse(search))
	const sortDictionary = {
		moreViews: { counter: -1 },
		lessViews: { counter: 1 },
		moreFollowers: { followers: -1 },
		lessFollowers: { followers: 1 },
		moreViewToday: { counter_day: -1 },
	}
	const [orderBy, setOrderBy] = useState(sortDictionary['moreViewToday'])
	const handleList = async () => {
		try {
			const response = await serviceGetData({ query: query, page: page, sort: orderBy })
			console.log(response)
			if (response.statusCode === 200) {
				setList([...list, ...response.data])
				setPage(page + 1)
				setLoading(false)
			} else {
				setLoading(false)
				setError({
					statusCode: 500,
					message: 'Acción no permitida',
				})
			}
		} catch (error) {
			setError({
				statusCode: 500,
				message: 'Error inesperado',
			})
		}
	}

	useEffect(() => {
		handleList()
		console.log('useEffect') // eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleMenuClick = async (item) => {
		setList([])
		setLoading(true)
		console.log(item.key, sortDictionary[item.key])
		setOrderBy(sortDictionary[item.key])
		const response = await serviceGetData({ query: query, page: 1, sort: sortDictionary[item.key] })
		console.log(response)
		setList([])
		setList([...response.data])
		setLoading(false)
	}

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
				<InfiniteScroll dataLength={list.length} next={handleList} hasMore={hasMore} loader={<center></center>}>
					<ListMasonry listMasonry={list} />
				</InfiniteScroll>
			</Content>
		</>
	)
}

export default Search
