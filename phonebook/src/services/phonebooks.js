import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
	const request = axios.get(baseUrl)

	return request.then(response => response.data)
}

const create = (newPerson) => {
	const request = axios.post(baseUrl, newPerson)

	return request.then(response => response.data)
}

const update = (id, newPerson) => {
	const confirmAction = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)

	if (confirmAction) {
		const request = axios.put(`${baseUrl}/${id}`, newPerson)

		return request.then(response => response.data)
	}
	else {
		return null
	}
}

const personDelete = (person) => {
	const confirmAction = window.confirm(`Delete ${person.name}`)

	if (confirmAction) {
		const request = axios.delete(`${baseUrl}/${person.id}`)

		return request.then(response => response.data)
	}
	else {
		return null
	}
}

export default {
	getAll,
	create,
	update,
	personDelete
}