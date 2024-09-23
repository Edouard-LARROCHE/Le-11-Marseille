const url = import.meta.env.VITE_API_URL_LOCAL

export const getAllClients = async () => {
	const response = await fetch(`${url}/client`)
	return response.json()
}

export const getClient = async (id) => {
	const response = await fetch(`${url}/client/${id}`)
	return response.json()
}

export const addClient = async (client) => {
	const response = await fetch(`${url}/client`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(client),
	})
	return response.json()
}

export const checkClient = async (client) => {
	const response = await fetch(`${url}/client/checkClient`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(client),
	})
	return response.json()
}

