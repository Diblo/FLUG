/**
 * StatutePage.js
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

const StatutePage = () => (
  <Scroller float>
    <ContentAlignment>
      <ContentHeader title="Vedtægter" />
      <h2>Navn og hjemsted</h2>
      <h3>§1. stk. 1</h3>
      <p>Foreningens navn er FLUG - Fyns Linux User Group.</p>
      <h3>§1. stk. 2</h3>
      <p>Foreningens hjemsted er Odense Universitet.</p>
      <h3>§1. stk. 3</h3>
      <p>
        Foreningens postadresse er:
        <br />
        <span className="indented-text">
          FLUG - Fyns Linux User Group
          <br />
          c/o Jesper K. Pedersen
          <br />
          Dronningensgade 56 2 sal.
          <br />
          5000 Odense C
        </span>
      </p>
      <h2>Formål</h2>
      <h3>§2. stk. 1</h3>
      <p>
        Det er foreningens formål at skabe arrangementer for Linux brugere på
        Fyn, samt sekundært at udbrede kendskabet til styresystemet Linux på Fyn
        samt GNU værktøjer og ideologier.
      </p>
      <h2>Medlemmer</h2>
      <h3>§3. stk. 1</h3>
      <p>
        Som medlemmer optages personer med interesse i større kendskab til
        Linux.
      </p>
      <h3>§3. stk. 2</h3>
      <p>
        Indmeldelse sker ved tilmelding til mailing listen{" "}
        <MailTo>flug-announce@flug.dk</MailTo>.
      </p>
      <h3>§3. stk. 3</h3>
      <p>
        Medlemmer betaler egne udgifter i forbindelse med arrangementer,
        arrangeret af foreningen.
      </p>
      <h3>§3. stk. 4</h3>
      <p>
        Udmeldelse sker ved afmelding af mailing listen{" "}
        <MailTo>flug-announce@flug.dk</MailTo>.
      </p>
      <h2>Generalforsamlingen</h2>
      <h3>§4. stk. 1</h3>
      <p>
        Foreningens øverste myndighed er generalforsamlingen samt afstemninger
        på mailing listen <MailTo>flug-stem@flug.dk</MailTo> (Se §10).
      </p>
      <h3>§4. stk. 2</h3>
      <p>
        Generalforsamlingen mødes ordinært en gang årligt, første torsdag i
        september.
      </p>
      <h3>§4. stk. 3</h3>
      <p>
        Generalforsamlingen består af foreningens medlemmer. Ikke-medlemmer har
        ikke ret til at overvære generalforsamlingen.
      </p>
      <h3>§4. stk. 4</h3>
      <p>
        Bestyrelsen kan indbyde gæster til at overvære generalforsamlingen.
        Indbudte gæster er dog uden stemmeret.
      </p>
      <h3>§4. stk. 5</h3>
      <p>
        Generalforsamlingen vælger 1 formand, 2 menige bestyrelsesmedlemmer samt
        2 supplanter. Kan der på generalforsamlingen ikke opstilles 3
        kandidater, vælger man det, på generalforsamlingen, antal mulige
        medlemmer til bestyrelsen. De, på generalforsamlingen valgte
        bestyrelsesmedlemmer, har efter den ordinære generalforsamling ret til
        at optage fuldgyldige bestyrelsesmedlemmer op til rammen på 3 personer.
        Heraf følger, at der ikke findes suppleanter.
      </p>
      <h3>§4. stk.6</h3>
      <p>
        Generalforsamlingens dato bekendtgøres på foreningens mailing liste{" "}
        <MailTo>flug-announce@flug.dk</MailTo>, mindst en uge før afholdelse.
      </p>
      <h3>§4. stk. 7</h3>
      <p>
        Generalforsamlingens dagsorden skal mindst indeholde følgende punkter:
        <ol>
          <li>Åbning af generalforsamling af formand</li>
          <li>Behandling af indkommende forslag</li>
          <li>Valg af 3 bestyrelsesmedlemmer</li>
          <li>Eventuelt</li>
        </ol>
      </p>
      <h3>§4. stk. 8</h3>
      <p>
        Ved personvalg gælder følgende regler:
        <br />
        Personvalg afgøres ved absolut flertal, evt. i flere afstemninger.
        <br />
        Afstemninger sker ved håndsoprækning. Forlanger forsamlingen en
        skriftlig afstemning, skal dette efterkommes, dersom mindst 1/4 af
        mødets deltagere anmoder derom.
      </p>
      <h3>§4. stk. 10</h3>
      <p>
        Ved andre afstamninger gælder følgende særlige regler:
        <br />
        Forslag om vedtægtsændringer vedtages med kvalificeret flertal på mindst
        2/3 af de afgivne stemmer.
      </p>
      <h3>§4. stk. 11</h3>
      <p>
        Forslag om foreningens opløsning kan kun behandles på en ekstraordinær
        generalforsamling, hvor mindst halvdelen af medlemmerne er til stede på
        afstemningstidspunktet, og hvor forslaget om opløsning vedtages med et
        kvalificeret flertal på mindst 2/3 af de afgivne stemmer. Er færre end
        halvdelen af medlemmerne til stede på afstemningstidspunktet, indkaldes
        til ny ekstraordinær generalforsamling, hvor forslaget om opløsning kan
        vedtages med absolut flertal af de afgivne stemmer uanset antallet af
        tilstedeværende medlemmer.
      </p>
      <h3>§4. stk. 12</h3>
      <p>
        Ekstraordinær generalforsamling kan indkaldes af bestyrelsen og skal
        indkaldes, hvis mindst 10 procent af medlemerne overfor bestyrelsen
        fremsætter begrundet anmodning herom. Generalforsamlingen skal afholdes
        senest fire uger efter, at anmodningen er modtaget.
      </p>
      <h3>§4. stk. 13</h3>
      <p>
        Fristen for indkaldelse af ekstraordinær generalforsamling er en uge.
      </p>
      <h2>Bestyrelsen</h2>
      <h3>§5. stk. 1</h3>
      <p>
        Bestyrelsen der består af 3 medlemmer, er foreningens højeste myndighed
        mellem generalforsamlingerne.
      </p>
      <h3>§5. stk. 2</h3>
      <p>
        Bestyrelsen er beslutningsdygtig, når mindst 2/3 er tilstedeværende.
      </p>
      <h3>§5. stk. 3</h3>
      <p>Bestyrelsen mødes efter behov.</p>
      <h3>§5. stk. 4</h3>
      <p>
        Bestyrelsen leder foreningen i overensstemmelse med nærværende vedtægter
        og beslutninger. Den har med disse begrænsninger myndighed til at handle
        på foreningens vegne, og i foreningens interesse. Bestyrelsen er
        ansvarlig for foreningens økonomi, dog uden at hæfte personligt, for
        eventuel gæld.
      </p>
      <h3>§5. stk. 5</h3>
      <p>
        Bestyrelsen kan nedsætte udvalg. I så fald skal bestyrelsen udarbejde et
        kommissorium for udvalgets arbejde og tage stilling til udvalgsarbejdets
        tidsmæssige udstrækning og økonomi.
      </p>
      <h3>§5. stk. 6</h3>
      <p>
        Personvalg afgøres ved absolut flertal, eventuelt i flere valgrunder.
      </p>
      <h3>§5. stk. 7</h3>
      <p>
        Ekstraordinært bestyrelsesmøde indkaldes hvis et bestyrelsesmedlem
        fremsætter begrundet anmodning herom til formanden. Ekstraordinært
        bestyrelsesmøde skal afholdes senest en uge efter, at anmodningen herom
        er modtaget af formanden.
      </p>
      <h3>§5. stk. 8</h3>
      <p>Foreningen tegnes af hel bestyrelsen.</p>
      <h3>§5. stk. 9</h3>
      <p>
        Udmeldelse af bestyrelsen foregår ved at sende en email til{" "}
        <MailTo>flug-announce@flug.dk</MailTo>.
      </p>
      <h2>Udvalg</h2>
      <h3>§6. stk. 1</h3>
      <p>
        Udvalgene skal behandle og komme med forslag om emner under udvalgenes
        sagsområder i overensstemmelse med deres kommissorier.
      </p>
      <h2>Økonomi</h2>
      <h3>§7. stk. 1</h3>
      <p>
        Foreningen er non-profit, dog kan penge opkræves ved specielle
        arrangementer til dækning af udgifter i forbindelse ved arrangementet.
      </p>
      <h2>Opløsning af foreningen</h2>
      <h3>§8. stk. 1</h3>
      <p>
        Beslutning om opløsning af foreningen kan kun træffes på en
        ekstraordinær generalforsamling, der er indkaldt med dette punkt på
        dagsordenen.
      </p>
      <h3>§8. stk. 2</h3>
      <p>
        Denne ekstraordinære generalforsamling er kun beslutningsdygtig, hvis
        mere end halvdelen af alle medlemmer er til stede på
        afstemningstidspunktet.
      </p>
      <h3>§8. stk. 3</h3>
      <p>
        Et forslag om opløsning kan kun vedtages med kvalificeret flertal på
        mindst 2/3 af de afgivne stemmer.
      </p>
      <h3>§8. stk. 4</h3>
      <p>
        Er færre end halvdelen af medlemmerne til stede på
        afstemningstidspunktet, indkaldes til ny ekstraordinær
        generalforsamling, hvor forslaget om opløsning kan vedtages med absolut
        flertal af de afgivne stemmer uanset antallet af tilstedeværende
        medlemmer.
      </p>
      <h3>§8. stk 5</h3>
      <p>
        Ved opløsning af foreningen tilfalder evt. aktiver til "The Free
        software foundation".
      </p>
      <h2>Datering</h2>
      <h3>§9. stk. 1</h3>
      <p>
        Ovenstående lovforslag er vedtaget på FLUG's stiftende generalforsamling
        den 2/9/1999. §10 blev tilføjet ved en ekstraordinær generalforsamling
        d. 25/11-99. Afstemninger på mailingadressen{" "}
        <MailTo>flug-stem@flug.dk</MailTo>.
      </p>
      <h3>§10. stk 1</h3>
      <p>
        Ud over afstemninger på generalforsamlingen kan vigtige beslutninger,
        herunder vedtægtsændringer, tages ved en afstemning på adressen{" "}
        <MailTo>flug-stem@flug.dk</MailTo>.
      </p>
      <h3>§10. stk 2</h3>
      <p>
        Afstemningen skal løbe over en uge, og skal annonceres på{" "}
        <MailTo>flug-announce@flug.dk</MailTo>.
      </p>
      <h3>§10. stk 3</h3>
      <p>Kun folk der er medlem ved afstemningens start må stemme.</p>
      <h3>§10. stk 4</h3>
      <p>
        Afstemningen foregår på følgende måde: Medlemmet sender en stemme til
        adressen <MailTo>flug-stem@flug.dk</MailTo>. I kroppen af denne mail
        skriver han hvad han stemmer, samt et alias som kun han kender.
        <br />
        Ved afslutning af afstemningen sendes svaret på{" "}
        <MailTo>flug-announce@flug.dk</MailTo>, samt en liste over hvem der har
        stemt (dvs folks rigtige email adresser), samt en liste over hvad hvilke
        aliases har stemt.
      </p>
      <HorizontalSpacing />
    </ContentAlignment>
  </Scroller>
)

export default StatutePage
