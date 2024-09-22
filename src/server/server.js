const url = import.meta.env.VITE_API_URL_LOCAL

export const getAllClients = async () => {
	const response = await fetch(`${url}/client`)
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

