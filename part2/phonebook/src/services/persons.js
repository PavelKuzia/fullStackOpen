import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)    
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteElement = (persons, index, setter) => {
    if (window.confirm(`Do you want to delete ${persons[index].name}?`)) {
        const url = `${baseUrl}/${persons[index].id}`
        axios.delete(url)
        const newPersons = persons.filter(person => person.id != persons[index].id)
        setter(newPersons)
    }
}

const update = (person, newNumber) => {
    const url = `${baseUrl}/${person.id}`
    const newPerson = {...person, number: newNumber}
    const request = axios.put(url, newPerson)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    deleteElement,
    update
}