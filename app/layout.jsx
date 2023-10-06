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
        {/* To use providers everywhere in the app */}
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>

          <main className='app'>
            <Navbar />
            <Provider />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout
