import React, { useState } from "react"
import { Avatar, Card, Typography, Button, Rate } from "antd"
import dayjs from "dayjs"

import "./card.scss"

const CardNotice = ({ item }) => {
	const { Paragraph } = Typography

	const [expanded, setExpanded] = useState({})

	const toggleExpand = (index) => {
		setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))
	}

	const formattedStartDate = dayjs(item.startDate).format("DD/MM/YYYY")
	const formattedEndDate = dayjs(item.endDate).format("DD/MM/YYYY")

	return (
		<Card
			className="card-shadow"
			style={{
				minWidth: 400,
				minHeight: 200,
				maxWidth: 400,
			}}
		>
			<Card.Meta
				avatar={
					item.avatar ? (
						<Avatar
							src={item.avatar}
							size={35}
							alt={item.firstName.split(" ")[0].slice(0, 1)}
						/>
					) : (
						<div className="container-letters">
							<p className="letter">
								{item.firstName
									.split(" ")[0]
									.slice(0, 1)
									.toUpperCase()}
								{item.lastName
									.split(" ")[0]
									.slice(0, 1)
									.toUpperCase()}
							</p>
						</div>
					)
				}
				title={
					<div
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<span>
							{item.firstName} {item.lastName}
						</span>
						<Rate
							defaultValue={item.rating}
							disabled
							style={{ color: "rgb(146, 108, 0)" }}
						/>
					</div>
				}
				description={
					<>
						<Paragraph
							ellipsis={
								expanded[item._id]
									? false
									: {
											rows: 4,
											expandable: true,
											symbol: " ",
										}
							}
						>
							{item.comment}
						</Paragraph>
						<p>
							<span className="date">
								Du {formattedStartDate} au {formattedEndDate}
							</span>
						</p>
					</>
				}
			/>
			{item.comment.length > 180 && (
				<Button
					className="button-expand"
					type="link"
					onClick={() => toggleExpand(item._id)}
				>
					{expanded[item._id] ? "Voir moins" : "Voir plus"}
				</Button>
			)}
		</Card>
	)
}

export default CardNotice

