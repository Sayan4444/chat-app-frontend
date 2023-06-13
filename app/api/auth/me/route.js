import { NextResponse } from "next/server";
import loggedInUserDetails from "../../utils/loggedInUserDetails";

export async function GET(req) {
    try {
        const user = await loggedInUserDetails(req);
        return NextResponse.json({ success: 'true', user });
    } catch (error) {
        return NextResponse.json({ success: 'false', error: 'Unauthorized' }, { status: 401 })
    }
}
