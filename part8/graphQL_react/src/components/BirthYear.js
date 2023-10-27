import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_BIRTH_YEAR, ALL_AUTHORS } from '../queries'
import Select from 'react-select';

const SetBirthYear = ( { authorNames }) => {
  const [birthYearStr, setBirthYear] = useState('')
	const options = authorNames.reduce((a, c) => a.concat({value: c, label: c}), [])
	const [selectedAuthor, setSelectedAuthor] = useState(options[0])
	const [ updateAuthorBirthYear ] = useMutation(UPDATE_BIRTH_YEAR, {
		refetchQueries: [ { query: ALL_AUTHORS } ]
	})
	const fieldStyle = { fontSize: 16, fontWeight: 'normal', textAlign: 'left' }

	const submit = async (event) => {
    event.preventDefault()
		const birthYear = parseInt(birthYearStr)
    updateAuthorBirthYear({ variables: { name: selectedAuthor.value, setBornTo: birthYear }})
  }

	return (
		<div>
			<h2>Set birthyear</h2>
			<form onSubmit={submit}>
				<table>
					<tbody>
						<tr>
							<th style={fieldStyle}>Author's Name</th>
							<th>
								<Select
									defaultValue={selectedAuthor}
									onChange={setSelectedAuthor}
									options={options}
								/>
							</th>
						</tr>
						<tr>
							<th style={fieldStyle}>Author's new birth year</th>
							<th>
							<input 
								value={birthYearStr}
								onChange={ ({ target }) => setBirthYear(target.value) }
							/>
							</th>
						</tr>
					</tbody>
				</table>
				<button type="submit" >update author</button>
			</form>
		</div>
	)
}

export default SetBirthYear