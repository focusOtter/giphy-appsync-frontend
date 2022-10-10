import {
	Button,
	Card,
	Flex,
	Image,
	TextField,
	View,
} from '@aws-amplify/ui-react'
import { API } from 'aws-amplify'
import { useState } from 'react'

const fetchGifs = `
  query FetchGifs($categoryName: String!, $secretName: String!, $limit: Int) {
    getGifs(categoryName: $categoryName, secretName: $secretName, limit: $limit) 
  }`

export default function Home() {
	const [gifUrls, setGifUrls] = useState([])
	const handleSubmit = async (e) => {
		e.preventDefault()
		const categoryName = e.target.categoryName.value
		const limit = e.target.limit.value
		const { data } = await API.graphql({
			query: fetchGifs,
			variables: {
				secretName: 'SecretId',
				categoryName,
				limit,
			},
		})

		setGifUrls(data.getGifs)
	}
	return (
		<View>
			<form onSubmit={handleSubmit}>
				<TextField type={'text'} label="Category Name" name="categoryName" />
				<TextField
					type={'number'}
					label="Category Name"
					defaultValue={3}
					name="limit"
				/>
				<Button type="submit" variation="primary">
					Submit
				</Button>
			</form>
			<Flex justifyContent={'center'} alignItems="center" wrap={'wrap'}>
				{gifUrls.map((gifUrl, i) => (
					<Card variation="elevated" key={i}>
						<Image src={gifUrl} alt={'d'} />
					</Card>
				))}
			</Flex>
		</View>
	)
}
