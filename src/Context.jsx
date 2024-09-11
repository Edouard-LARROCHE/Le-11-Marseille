import React, { createContext, useContext, useRef } from "react"

const ScrollContext = createContext()

export const ScrollProvider = ({ children }) => {
	const targetRef = useRef(null)

	return (
		<ScrollContext.Provider value={targetRef}>
			{children}
		</ScrollContext.Provider>
	)
}

export const useScrollTarget = () => {
	return useContext(ScrollContext)
}

