import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import { graphql, Link } from "gatsby"
import Search from "../components/search-input"

const Watched = props => {
  const vids = props.data.allWatchHistoryJson.nodes
  const listItems = vids.map(v => (
    <li key={v.fields.slug}>
      <Link to={v.fields.slug}>{v.fields.title}</Link>- {v.time}
    </li>
  ))
  return (
    <Layout>
      <SEO title="Watched" />
      <h1>Watched Videos</h1>
      <p>This is my youtube viewing history</p>
      <Search></Search>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    allWatchHistoryJson {
      nodes {
        title
        titleUrl
        time(fromNow: true)
        fields {
          slug
          title
        }
      }
    }
  }
`
export default Watched
