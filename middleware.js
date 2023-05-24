import { NextResponse } from 'next/server';

export async function middleware(req) {
    try {
        const token = req.cookies.get('token')?.value;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_url}/api/auth/me`, {
            // credentials: 'include',
            headers: { "Authorization": `Bearer ${token}` },
            cache: 'no-cache'
        })
        const data = await res.json();
        if (req.nextUrl.pathname.startsWith('/signin')) {
            return NextResponse.redirect(new URL(req.nextUrl.origin))
        }
        return NextResponse.next();
    }
    catch {
        if (req.nextUrl.pathname === '/') return NextResponse.redirect(new URL('/signin', req.pathname.origin));
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/', '/signin']
};

// req.nextUrl.pathname-> gets the name of the final url to which the page will be going