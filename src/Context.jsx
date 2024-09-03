import React, { createContext, useContext, useState } from "react"

const AnimationContext = createContext()

export const AnimationProvider = ({ children }) => {
	const initialAnimationState = localStorage.getItem("hasAnimated") === "true"
	const [hasAnimated, setHasAnimatedState] = useState(initialAnimationState)

	const setHasAnimated = (value) => {
		setHasAnimatedState(value)
		localStorage.setItem("hasAnimated", value)
	}

	return (
		<AnimationContext.Provider value={{ hasAnimated, setHasAnimated }}>
			{children}
		</AnimationContext.Provider>
	)
}

export const useAnimation = () => useContext(AnimationContext)

