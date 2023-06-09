import { NextResponse } from 'next/server';

export async function middleware(req) {

    if (req.nextUrl.pathname === '/signin') {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.next();
        const resData = await protect(token);
        if (resData.success === "true") return NextResponse.redirect(new URL('/', req.nextUrl.origin));
        return NextResponse.next();
    }


    else if (req.nextUrl.pathname === '/') {
        const token = req.cookies.get('token')?.value;
        if (!token) return NextResponse.redirect(new URL('/signin', req.nextUrl.origin));
        try {
            const resData = await protect(token);
            if (resData.success === "false") throw new Error();
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/signin', req.nextUrl.origin));
        }
    }

    async function protect(token) {
        const res = await fetch(`${req.nextUrl.origin}/api/auth/protect`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-cache'
        })
        const resData = await res.json();
        return resData;
    }
}

export const config = {
    matcher: ['/', '/signin']
};

// req.nextUrl.pathname-> gets the name of the final url to which the page will be going