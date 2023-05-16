export const metadata = {
  title: 'ChatBot',
  description: 'Made by Pranav',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body>{children}</body>
    </html>
  )
}
