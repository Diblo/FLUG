import React from "react";
import Content, { ContentTitle } from "../components/Content";

import "../styles/screens/NotFoundScreen.css";

export default function NotFoundScreen() {
	return (
		<Content bgImage="/images/bg_error2.jpg" containerClass="not-found">
			<ContentTitle>Siden blev ikke fundet</ContentTitle>
			<p>Beklager, siden eksisterer ikke.</p>
		</Content>
	);
}
