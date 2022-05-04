import '../styles/globals.css'

import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import theme from 'theme'

import store from '@/app/store'
import Layout from '@/components/Layout/Layout'

const MyApp = ({ Component, pageProps }: AppProps) => (
	<Provider store={store}>
		<ChakraProvider resetCSS theme={theme}>
			<Layout />
			<Component {...pageProps} />
		</ChakraProvider>
	</Provider>
)

export default MyApp
