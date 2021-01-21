import { useEffect } from "react"
import Head from "next/head"
import { ThemeProvider } from "@material-ui/core"
import { dark } from "../src/utils/theme"
import "../styles/globals.css"

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Days</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={dark}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
