import { NextResponse } from "next/server";

export default async function middleware(request: Request) {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/api/proxy-login")) {
    const fetchUrl = "http://183.82.7.208:3002/anyapp/authentication/";
    const fetchResponse = await fetch(fetchUrl, {
      method: "POST",
      headers: request.headers,
      body: await request.text(),
    });

    const responseData = await fetchResponse.json();
    return NextResponse.json(responseData, { status: fetchResponse.status });
  }

  return NextResponse.next();
}
