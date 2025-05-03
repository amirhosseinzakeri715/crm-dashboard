import { NextResponse } from 'next/server'

export async function POST(req) {
  const { email, password } = await req.json()
  
  // Replace with actual authentication logic
  if (email === 'test@example.com' && password === 'password') {
    const user = { id: 1, email, name: 'Test User' }
    
    const response = NextResponse.json({ user })
    
    // Set HttpOnly cookie (in production, add secure: true and sameSite: 'strict')
    response.cookies.set('token', 'your.jwt.token.here', {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })
    
    return response
  }
  
  return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
}