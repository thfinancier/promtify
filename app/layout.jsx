import '@styles/globals.css'

import Navbar from '@components/Navbar'
import Provider from '@components/Provider'

export const metadata = {
  title: 'Promtify',
  description: 'Discover & Share prompts for AI',
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Navbar />
          <Provider />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
