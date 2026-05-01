import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

const protectedRoutes = ['/blog', '/create']
const authRoutes = ['/auth/sign-in', '/auth/sign-up']

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl
    const session = request.cookies.get('session_token')?.value
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
    const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))
    if (isProtectedRoute && !session) return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    if (isAuthRoute && session) return NextResponse.redirect(new URL('/', request.url))
    return NextResponse.next()
}

 
export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
}