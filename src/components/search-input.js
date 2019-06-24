import React, { useState } from "react"
import { Link } from "gatsby"

const Search = () => {
  const [query, setQuery] = useState()
  const [results, setResults] = useState([])

  const getSearchResults = q => {
    if (!q || !window.__LUNR__) return []
    const idx = window.__LUNR__.en
    const results = idx.index.search(q)
    return results.map(({ ref }) => idx.store[ref])
  }
  const search = evt => {
    const q = evt.target.value
    setQuery(q)
    setResults(getSearchResults(q))
  }

  return (
    <div>
      <input type="text" value={query} onChange={search}></input>
      <ul>
        {results.map(page => (
          <li key={page.url}>
            <Link to={page.slug}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Search
