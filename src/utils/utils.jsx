export const shuffleArray = (array) => {
	let shuffledArray = array.slice()
	for (let i = shuffledArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffledArray[i], shuffledArray[j]] = [
			shuffledArray[j],
			shuffledArray[i],
		]
	}

	return shuffledArray
}

export const generateId = () => Math.floor(Math.random() * 1000)

export const capitalizeFirstLetter = (string) => {
	if (!string) return ""

	return string
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("-")
}

