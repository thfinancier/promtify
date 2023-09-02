import '@styles/globals.css'

export const metadata = {
    title: 'Promtify',
    description: 'Discover & Share prompts for AI'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <div className="main">
            <div className='gradient' />
        </div>

        <main className='app'>
            {children}
        </main>
    </html>
  )
}

export default RootLayout