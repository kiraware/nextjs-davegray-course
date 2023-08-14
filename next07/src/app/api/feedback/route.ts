import { NextResponse } from "next/server";

type Feedback = {
  name?: "";
  email?: "";
  message?: "";
};

export async function POST(request: Request) {
  const data: Feedback = await request.json();
  console.log("data: ", data);

  const { name, email, message } = data;

  return NextResponse.json({ name, email, message });
}
