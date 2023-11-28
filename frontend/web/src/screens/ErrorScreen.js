import React from "react";
import Content, { ContentTitle } from "../components/Content";

import "../styles/screens/ErrorScreen.css";

export default function ErrorScreen() {
	return (
		<Content bgImage="/images/bg_error2.jpg" containerClass="error">
			<ContentTitle>Beklager Ulejligheden</ContentTitle>
			<p>
				Vi beklager, men der opstod en fejl. FLUG er blevet underrettet om
				problemet. Vi takker for din tålmodighed, og vi bestræber os på at få
				dette løst så hurtigt som muligt.
			</p>
		</Content>
	);
}
