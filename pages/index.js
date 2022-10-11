import {
	Button,
	Card,
	Flex,
	Heading,
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
	const [gifUrls, setGifUrls] = useState(null)
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
			<Heading textAlign={'center'} level="1" marginBlock={'relative.large'}>
				Welcome to Gif Search!
			</Heading>
			<form onSubmit={handleSubmit}>
				<Flex justifyContent={'center'}>
					<TextField
						backgroundColor={'white'}
						type={'text'}
						label="Gif Search Term"
						name="categoryName"
						placeholder="enter a search word"
					/>
					<TextField
						backgroundColor={'white'}
						type={'number'}
						label="Gif Limit"
						defaultValue={3}
						name="limit"
					/>
				</Flex>

				<Flex justifyContent={'center'}>
					<Button
						size="large"
						type="submit"
						variation="primary"
						marginTop={'relative.medium'}
					>
						Submit
					</Button>
				</Flex>
			</form>

			<Flex
				marginTop={'relative.xxl'}
				justifyContent={'center'}
				alignItems="center"
				wrap={'wrap'}
			>
				{!gifUrls ? (
					<Card variation="elevated" key={'ralph hello'}>
						<Image
							src={'https://media.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif'}
							alt={'giphy'}
							height="200px"
						/>
					</Card>
				) : (
					gifUrls.map((gifUrl, i) => (
						<Card variation="elevated" key={i}>
							<Image src={gifUrl} alt={'giphy'} height="200px" />
						</Card>
					))
				)}
			</Flex>
		</View>
	)
}
