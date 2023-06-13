import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    const token = req.cookies.get('token')?.value;


    if (req.nextUrl.pathname === '/signin') {
        if (!token) return NextResponse.next();
        const resData = await protect(token);
        if (resData.success === "true") return NextResponse.redirect(new URL('/', req.nextUrl.origin));
        return NextResponse.next();
    }

    else if (req.nextUrl.pathname === '/') {
        if (!token) return NextResponse.redirect(new URL('/signin', req.nextUrl.origin));
        try {
            const resData = await protect(token);
            if (resData.success === "false") throw new Error();
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/signin', req.nextUrl.origin));
        }
    }

    else if (req.nextUrl.pathname.startsWith('/api/chat')) {
        const resData = await protect(token);
        if (resData.success === 'true') return NextResponse.next();
        const { success, error, status } = resData;
        return NextResponse.json({ success, error }, { status })
    }

    async function protect(token) {
        let obj;
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET)
            await jwtVerify(token, secret);

            obj = { success: 'true' }
        } catch (error) {
            obj = { success: 'false', error: 'Unauthorized', status: 401 }
        }
        return obj;
    }
}

export const config = {
    matcher: ['/', '/signin', '/api/:path*'],
};
