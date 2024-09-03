import PicNeighborhood3469 from "../assets/images/pictures/A PROXIMITE, LE QUARTIER/IMG_3469.jpg"
import PicNeighborhood3470 from "../assets/images/pictures/A PROXIMITE, LE QUARTIER/IMG_3470.jpg"

import PicBalcony3213 from "../assets/images/pictures/BALCON/IMG_3213.jpg"
import PicBalcony3214 from "../assets/images/pictures/BALCON/IMG_3332.jpg"

import PicBox3276 from "../assets/images/pictures/BOX/IMG_3276.jpg"
import PicBox3277 from "../assets/images/pictures/BOX/IMG_3277.jpg"

import PicRoom3289 from "../assets/images/pictures/CHAMBRE/IMG_3289.jpg"
import PicRoom3290 from "../assets/images/pictures/CHAMBRE/IMG_3291.jpg"

import PicKitchen3195 from "../assets/images/pictures/CUISINE/IMG_3195.jpg"
import PicKitchen3196 from "../assets/images/pictures/CUISINE/IMG_3196.jpg"

import PicDressroom3280 from "../assets/images/pictures/DRESSING/IMG_3280.jpg"

import PicEntrance3279 from "../assets/images/pictures/ENTREE/IMG_3279.jpg"
import PicEntrance3281 from "../assets/images/pictures/ENTREE/IMG_3281.jpg"

import PicBuilding2628 from "../assets/images/pictures/L'IMMEUBLE/IMG_2628.jpg"
import PicBuilding2629 from "../assets/images/pictures/L'IMMEUBLE/IMG_2629.jpg"

import PicLogia3353 from "../assets/images/pictures/LOGGIA/IMG_3353.jpg"
import PicLogia3354 from "../assets/images/pictures/LOGGIA/IMG_3355.jpg"

import PicBathroom3218 from "../assets/images/pictures/SDB/IMG_3218.jpg"
import PicBathroom3219 from "../assets/images/pictures/SDB/IMG_3219.jpg"

import PicLivingroom3283 from "../assets/images/pictures/SEJOUR/IMG_3283.jpg"

const generateId = () => Math.floor(Math.random() * 1000)

const picturesData = {
	neighborhood: [
		{
			id: generateId(),
			title: "A Proximité, le quartier",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicNeighborhood3469,
		},
		{
			id: generateId(),
			title: "A Proximité, le quartier",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicNeighborhood3470,
		},
	],
	balcony: [
		{
			id: generateId(),
			title: "Le balcon",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicBalcony3213,
		},
		{
			id: generateId(),
			title: "Le balcon",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicBalcony3214,
		},
	],
	box: [
		{
			id: generateId(),
			title: "Le box",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicBox3276,
		},
		{
			id: generateId(),
			title: "Le box",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicBox3277,
		},
	],
	room: [
		{
			id: generateId(),
			title: "La chambre",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicRoom3289,
		},
		{
			id: generateId(),
			title: "La chambre",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicRoom3290,
		},
	],
	kitchen: [
		{
			id: generateId(),
			title: "La cuisine",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicKitchen3195,
		},
		{
			id: generateId(),
			title: "La cuisine",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicKitchen3196,
		},
	],
	dressroom: [
		{
			id: generateId(),
			title: "La salle de coiffure",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicDressroom3280,
		},
	],
	entrance: [
		{
			id: generateId(),
			title: "L'entrée",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicEntrance3279,
		},
		{
			id: generateId(),
			title: "L'entrée",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicEntrance3281,
		},
	],
	building: [
		{
			id: generateId(),
			title: "L'immeuble",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicBuilding2628,
		},
		{
			id: generateId(),
			title: "L'immeuble",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicBuilding2629,
		},
	],
	loggia: [
		{
			id: generateId(),
			title: "La loggia",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicLogia3353,
		},
		{
			id: generateId(),
			title: "La loggia",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicLogia3354,
		},
	],
	bathroom: [
		{
			id: generateId(),
			title: "La salle de bain",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicBathroom3218,
		},
		{
			id: generateId(),
			title: "La salle de bain",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicBathroom3219,
		},
	],
	livingroom: [
		{
			id: generateId(),
			title: "Le salon",
			desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas, quidem.",
			imageUrl: PicLivingroom3283,
		},
	],
}

export default picturesData

