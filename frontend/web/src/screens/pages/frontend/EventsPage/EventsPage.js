import React from "react"

import BackgroundImage from "../../../../components/BackgroundImage/BackgroundImage"
import Scroller from "../../../../components/Scroller/Scroller"
import {
  ContentAlignment,
  ContentHeader,
} from "../../../../components/Content/Content"

import bgImage from "../../../../assets/images/bg1.jpg"

const EventsPage = () => {
  return (
    <BackgroundImage url={bgImage}>
      <Scroller float>
        <ContentAlignment>
          <ContentHeader title="Event list" />
          Content
        </ContentAlignment>
      </Scroller>
    </BackgroundImage>
  )
}

export default EventsPage
