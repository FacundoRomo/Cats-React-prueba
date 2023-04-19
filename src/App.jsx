import { useEffect, useState } from 'react'
import './App.css'

const URL_CAT_RANDMON_FACT = 'https://catfact.ninja/fact'
const URL_CAT_PREFIX = 'https://cataas.com'

export function App () {
  const [fact, setFacts] = useState()
  const [urlImg, setUrlImg] = useState()

  useEffect(() => {
    fetch(URL_CAT_RANDMON_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFacts(fact)
      })
  }, [])
  // Primera palabra del fact
  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then(response => {
        const { url } = response
        setUrlImg(url)
      })
  }, [fact])
  return (
    <main className='app'>
      <h1>hola</h1>
      {fact && <p>{fact}</p>}
      {urlImg && <img src={`${URL_CAT_PREFIX}${urlImg}`} alt={`Esta imagen fue creada con las primeras 3 palabras de ${fact}`} />}
    </main>
  )
}
