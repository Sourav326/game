
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from "jwt-decode";

export function middleware(request: NextRequest) {
  // const token = request.cookies.get('JWTtoken')?.value || ''
  let role = 'user'
  // if(token){
  //     const user = jwtDecode(token)
  //     if(user){
  //         role = user.role
  //     }
  // }
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/register' || path === '/' || path === '/lost-password' || path === '/validate-otp'
  const isAdmin = path.startsWith('/admin')


  //   if(isPublicPath && token) {
  //     return NextResponse.redirect(new URL('/', request.nextUrl))
  //   }

  //   if (!isPublicPath && !token) {
  //     return NextResponse.redirect(new URL('/login', request.nextUrl))
  // }

  // if(role == 'user' && isAdmin)
  //     return NextResponse.redirect(new URL('/login', request.nextUrl))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/register',
    '/lost-password',
    '/validate-otp',
    '/admin/:path*',
    '/user/:path*'
  ]
}
