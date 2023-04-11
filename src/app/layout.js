import './globals.css'

export const metadata = {
  title: 'Upload a file',
  description: 'Component to upload a file',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  )
}
