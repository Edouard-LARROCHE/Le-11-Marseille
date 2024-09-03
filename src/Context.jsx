import React, { createContext, useContext, useState, useEffect } from "react"

const AnimationContext = createContext()

export const AnimationProvider = ({ children }) => {
	const initialAnimationState = localStorage.getItem("hasAnimated") === "true"
	const [hasAnimated, setHasAnimatedState] = useState(initialAnimationState)

	const setHasAnimated = (value) => {
		setHasAnimatedState(value)
		localStorage.setItem("hasAnimated", value)
	}

	useEffect(() => {
		setHasAnimated(false)
	}, [])

	return (
		<AnimationContext.Provider value={{ hasAnimated, setHasAnimated }}>
			{children}
		</AnimationContext.Provider>
	)
}

export const useAnimation = () => useContext(AnimationContext)

