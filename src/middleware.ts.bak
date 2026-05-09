import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Configurar Permissions Policy para hCaptcha
  response.headers.set('Permissions-Policy', 
    'private-state-token-redemption=*, private-state-token-issuance=*'
  )

  // Headers de seguridad adicionales
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

// Aplicar middleware solo en rutas que necesiten hCaptcha
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}
