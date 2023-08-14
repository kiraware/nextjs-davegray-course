// http://localhost:3000/api/revalidate?path=/&secret=5c5e29e12a1b9dfd92a3928772df1110

/*
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "/";
  const token = request.nextUrl.searchParams.get("token");

  if (token === process.env.MY_SECRET_TOKEN) {
    revalidatePath(path);
    return NextResponse.json({ revalidated: true, now: Date.now() });
  }

  return NextResponse.json({ revalidated: false, message: "Invalid Token" });
}
*/

import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid Token" });
  }

  const path = req.query.path as string;

  await res.revalidate(path);

  return res.json({ revalidated: true });
}
