import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const WatchedVideComponent = props => {
  const { data } = props
  const vid = data.watchHistoryJson
  const url = `https://www.youtube.com/embed/${vid.fields.youtubeId}`
  return (
    <Layout>
      <SEO title={vid.fields.title} />
      <h1>{vid.fields.title}</h1>
      <iframe
        width="560"
        height="315"
        src={url}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <Link to="/watched">Go back</Link>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    watchHistoryJson(fields: { slug: { eq: $slug } }) {
      title
      titleUrl
      fields {
        slug
        youtubeId
        title
      }
      id
    }
  }
`

export default WatchedVideComponent
