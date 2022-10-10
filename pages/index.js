import { Button, TextField, View } from '@aws-amplify/ui-react'
import { API } from 'aws-amplify'

export default function Home() {
	const handleSubmit = async (e) => {
		e.preventDefault()
		const categoryName = e.target.categoryName.value
		const limit = e.target.limit.value
		const { data } = await API.graphql({
			query: '',
			variables: {
				secretName: 'SecretId',
				categoryName,
				limit,
			},
		})

		console.log(data)
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
		</View>
	)
}
