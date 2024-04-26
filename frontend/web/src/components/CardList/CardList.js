/**
 * CardList.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/}
 * @author Fyns Linux User Group
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
const CardList = ({ cards }) => (
  <div id="card-list">
    {cards.map((card, cardIndex) => (
      <div key={cardIndex} className="card-item" onClick={card.onClick || null}>
        <div
          className={`card-title ${card.bgImage && "card-bgImage"}`}
          style={{
            backgroundImage: card.bgImage ? `url(${card.bgImage})` : null,
          }}>
          {card.title}
        </div>
        <div className="card-desc">{card.desc}</div>
      </div>
    ))}
  </div>
)

export default CardList
