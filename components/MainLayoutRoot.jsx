'use client'

import { Toaster } from 'sonner'


const MainLayoutRoot = ({children}) => {
  return (
          <>
          <Toaster richColors expand={true} position="top-center"  />
                {children}
          </>
  )
}

export default MainLayoutRoot