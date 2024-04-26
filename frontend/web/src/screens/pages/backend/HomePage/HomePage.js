import React from "react"

import { useRouter } from "../../../../modules/router"

import { text } from "../../../../utils/i18n"

import {
  ContentAlignment,
  ContentHeader,
} from "../../../../components/Content/Content"
import { InternalLink } from "../../../../components/Links/Links"

import { ReactComponent as EventIcon } from "../../../../assets/images/event_icon.svg"
import { ReactComponent as BlogIcon } from "../../../../assets/images/blog_icon.svg"
import { ReactComponent as UsersIcon } from "../../../../assets/images/users_icon.svg"

import "./HomePage.css"

export default function HomePage() {
  const { getPathByAlias } = useRouter()

  return (
    <ContentAlignment>
      <ContentHeader title={text("backend.admin")} />
      <div id="admin-container">
        <InternalLink
          target={getPathByAlias("admin.events")}
          title={text("event.events")}
        >
          <EventIcon />
          {text("event.events")}
        </InternalLink>
        <InternalLink
          target={getPathByAlias("admin.blogs")}
          title={text("blog.blogs")}
        >
          <BlogIcon />
          {text("blog.blogs")}
        </InternalLink>
        <InternalLink
          target={getPathByAlias("admin.users")}
          title={text("user.users")}
        >
          <UsersIcon />
          {text("user.users")}
        </InternalLink>
      </div>
    </ContentAlignment>
  )
}
