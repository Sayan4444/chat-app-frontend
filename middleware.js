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
        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET)

            await jwtVerify(token, secret);

            return NextResponse.json({ success: 'true', user });
        } catch (error) {
            return NextResponse.json({ success: 'false', error: 'Unauthorized' }, { status: 401 })
        }

    }
}

export const config = {
    matcher: ['/', '/signin'],
};
