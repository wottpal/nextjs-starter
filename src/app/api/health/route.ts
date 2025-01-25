import { NextResponse } from 'next/server'

export async function GET() {
  // Return success
  return NextResponse.json('Success', { status: 200 })
}
