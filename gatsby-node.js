/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")
// You can delete this file if you're not using it
const getYoutubeId = node => {
  if (!node.titleUrl) return ``
  const { titleUrl } = node
  const prefix = `https://www.youtube.com/watch?v=`
  return titleUrl.replace(prefix, ``)
}
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `WatchHistoryJson`) {
    // console.log(`${node.title}`)
    const slug = `/watched/${node.id}`
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    createNodeField({
      node,
      name: `youtubeId`,
      value: getYoutubeId(node),
    })

    createNodeField({
      node,
      name: `title`,
      value: node.title.replace('Watched ', ''),
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      allWatchHistoryJson(limit: 5000) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return new Promise((resolve, reject) => {
    result.data.allWatchHistoryJson.edges.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve("src/templates/watched-videos.js"),
        context: {
          slug: node.fields.slug,
        },
      })
    })
    resolve()
  })
}
