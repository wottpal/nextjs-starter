export async function GET() {
  return Response.json(
    {
      message: 'Auth required',
    },
    {
      status: 401,
      headers: {
        'WWW-authenticate': 'Basic realm="Site access"',
      },
    },
  )
}
