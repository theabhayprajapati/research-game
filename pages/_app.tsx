import { AppContextProvider } from '../context/AppContext'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>

  )
}
