import { useState } from 'react'
import HomePage from '../components/component/tabs/homepage.component'


export default function Home() {
  const [bookmarksChecked, setBookmarksChecked] = useState(true)
  const [urlsChecked, setUrlsChecked] = useState(false)
  const [person, setPerson] = useState('pedro')
  return (
    <div className='grid place-items-center h-screen p-10'>
      <HomePage />
    </div>
  )
}
