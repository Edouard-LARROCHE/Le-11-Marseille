import React, { useState } from "react"
import { Avatar, Card, Typography, Button, Rate } from "antd"
import "./card.scss"

const CardNotice = ({ item }) => {
	const { Paragraph } = Typography

	const [expanded, setExpanded] = useState({})

	const toggleExpand = (index) => {
		setExpanded((prev) => ({ ...prev, [index]: !prev[index] }))
	}

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
							alt={item.author.split(" ")[0].slice(0, 1)}
						/>
					) : (
						<p className="letter">
							{item.author.split(" ")[0].slice(0, 1)}
						</p>
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
						<span>{item.author}</span>
						<Rate
							allowHalf
							defaultValue={item.valueRate}
							disabled
							style={{ color: "rgb(146, 108, 0)" }}
						/>
					</div>
				}
				description={
					<>
						<Paragraph
							ellipsis={
								expanded[item.id]
									? false
									: {
											rows: 4,
											expandable: true,
											symbol: " ",
										}
							}
						>
							{item.desc}
						</Paragraph>
						<p>
							<span className="date">
								Du {item.dateStart} au {item.dateEnd}
							</span>
						</p>
					</>
				}
			/>
			{item.desc.length > 180 && (
				<Button
					className="button-expand"
					type="link"
					onClick={() => toggleExpand(item.id)}
				>
					{expanded[item.id] ? "Voir moins" : "Voir plus"}
				</Button>
			)}
		</Card>
	)
}

export default CardNotice

