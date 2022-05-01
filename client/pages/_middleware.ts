import { NextRequest, NextResponse } from 'next/server'
//! Middeware for protection against CSRF attacks
const signedinPages = ['/admin']

export default function middleware(req: NextRequest) {
	const url = req.nextUrl.clone()
	url.pathname = '/login'

	if (signedinPages.find(p => p === req.nextUrl.pathname)) {
		const token = req.cookies.TRAX_ACCESS_TOKEN

		if (!token) {
			return NextResponse.redirect(url)
		}
	}
}
