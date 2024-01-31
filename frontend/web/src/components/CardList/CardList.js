/**
 * Copyright (c) 2024 Fyns Linux User Group
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * File: CardList.js
 */
import React from "react"

/**
 * @typedef {object} Cards
 * @property {string} title
 * @property {string} desc
 * @property {string} bgImage
 * @property {()=>{}} onClick
 */

/**
 * Represents the Table props.
 *
 * @param {object} props
 * @param {Array.<Cards>} props.cards
 * @returns {JSX.Element} The rendered table component.
 */
export const CardList = ({ cards }) => {
  return (
    <div id="card-list">
      {cards.map((card, cardIndex) => (
        <div
          key={cardIndex}
          className="card-item"
          onClick={card.onClick || null}
        >
          <div
            className={`card-title ${card.bgImage && "card-bgImage"}`}
            style={{
              backgroundImage: card.bgImage ? `url(${card.bgImage})` : null,
            }}
          >
            {card.title}
          </div>
          <div className="card-desc">{card.desc}</div>
        </div>
      ))}
    </div>
  )
}

export default CardList
