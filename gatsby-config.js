module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-lunr`,
      options: {
        languages: [
          {
            // ISO 639-1 language codes. See https://lunrjs.com/guides/language_support.html for details
            name: "en",
            // A function for filtering nodes. () => true by default
            filterNodes: node => true,
            // Add to index custom entries, that are not actually extracted from gatsby nodes
            // customEntries: [{ title: 'Pictures', content: 'awesome pictures', url: '/pictures' }],
          },
          // {
          //   name: "fr",
          //   filterNodes: node => node.frontmatter.lang === "fr",
          // },
        ],
        fields: [
          { name: `title`, store: true, attributes: { boost: 20 } },
          { name: `url`, store: true },
          { name: `slug`, store: true },
        ],
        resolvers: {
          WatchHistoryJson: {
            title: node => node.title,
            url: node => node.titleUrl,
            slug: node => node.fields.slug,
          },
        },
        //custom index file name, default is search_index.json
        // filename: "search_index.json",
      },
    },
  ],
}
