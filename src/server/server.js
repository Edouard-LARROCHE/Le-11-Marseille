const url =
	import.meta.env.VITE_API_URL_LOCAL || import.meta.env.VITE_API_URL || "/api"

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

export const addNotice = async (formData) => {
	const response = await fetch(`${url}/notice`, {
		method: "POST",
		body: formData,
	})
	return response.json()
}

export const getAllNotices = async () => {
	const response = await fetch(`${url}/notice`)
	return response.json()
}

export const getNoticesByUserId = async (userId) => {
	const response = await fetch(`${url}/notice/user/${userId}`)
	return response.json()
}

export const confirmationEmail = async (formData) => {
	const response = await fetch(`${url}/send-confirmation-email`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(formData),
	})
	return response.json()
}

export const updateClientHasPostedReview = async (id, hasPostedReview) => {
	const response = await fetch(`${url}/client/${id}/hasPostedReview`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ hasPostedReview }),
	})
	return response.json()
}

export const removeNotice = async (id) => {
	const response = await fetch(`${url}/notice/${id}`, {
		method: "DELETE",
	})
	return response.json()
}

export const login = async (email, password) => {
	const response = await fetch(`${url}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	})
	return response.json()
}

