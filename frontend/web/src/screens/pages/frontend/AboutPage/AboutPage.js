/**
 * AboutPage.js
 *
 * @file <description>
 * @license GNU Affero General Public License v3.0
 * @see {@link https://www.gnu.org/licenses/} More information about the GNU Affero General Public License v3.0
 * @author Fyns Linux User Group
 */
import React from "react"

import Scroller from "../../../../components/Scroller/Scroller"
import {
  ContentAlignment,
  ContentHeader,
} from "../../../../components/Content/Content"
import HorizontalSpacing from "../../../../components/HorizontalSpacing/HorizontalSpacing"

import { MailTo } from "../../../../components/Links/Links"

const AboutPage = () => (
  <Scroller float>
    <ContentAlignment>
      <ContentHeader title="Om FLUG" />
      <p>
        Fyns Linux User Group er en forening for dig med passion for Open
        Source. Kom med til et af FLUGs foredrag eller install parties. Alle er
        velkomne, og medlemskabet er gratis og uforpligtende.
      </p>
      <p>
        FLUG afholder møder ca. hver fjortende dag, hvor vi præsenterer foredrag
        om emner relateret til Open Source. Cirka en gang om måneden arrangerer
        vi også et installationsmøde om et aktuelt emne inden for Open Source.
        Emnet på vores installationsmøder kan variere og stammer ofte fra de
        emner, vi har behandlet i vores foredrag, hvis vi ønsker at dykke dybere
        ned i emnet.
      </p>
      <p>
        FLUG blev grundlagt i 1996 som en interessegruppe for studerende på
        Odense Universitet. I dag tæller FLUGs medlemmer en bred vifte af folk,
        lige fra postbude, gymnasieelever og deres lærere til professionelle
        systemadministratorer.
      </p>
      <p>
        Hvis du er interesseret i at deltage i et af vores møder, er du
        velkommen til at sende en e-mail til <MailTo>flug-misc@flug.dk</MailTo>.
      </p>
      <HorizontalSpacing />
    </ContentAlignment>
  </Scroller>
)

export default AboutPage
