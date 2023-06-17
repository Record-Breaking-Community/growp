import '~/styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from '~/components/layout'
import AlertProvider from '~/components/provider/AlertProvider'
import LayoutProvider from '~/components/provider/LayoutProvider'
import type { AppProps } from 'next/app'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutProvider>
        <AlertProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AlertProvider>
      </LayoutProvider>
    </QueryClientProvider>
  )
}
