import './globals.css'
import MainLayoutRoot from '@/components/MainLayoutRoot'

export const metadata = {
  title: 'Aviator',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <MainLayoutRoot>
          {children}
        </MainLayoutRoot>
      </body>
    </html>
  )
}
