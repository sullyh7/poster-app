import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Figtree, Inter, Noto_Sans } from 'next/font/google'
import LoginStatus from '@/components/LoginStatus'
import Footer from '@/components/Footer'
import SupabaseProvider from '@/providers/SupabaseProvider'

const figtree = Figtree({ subsets: ['latin'] })
const notosans = Noto_Sans({ weight: "900", subsets: ["latin"]})

export const metadata: Metadata = {
  title: 'Poster',
  description: 'Share and view posts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={notosans.className}>
        <SupabaseProvider>
          <Navbar/>
            { children }
          <Footer/>
        </SupabaseProvider>
      </body>
    </html>
  )
}
