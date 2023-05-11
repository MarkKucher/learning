import Document, { DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {

    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        href='https://fonts.googleapis.com/css?family=Manrope&display=optional'
                        rel='stylesheet'
                    />
                </Head>
                <body>
                <Main />
                <NextScript />
                <script defer src="js/prism"></script>
                </body>
            </Html>
        )
    }
}

