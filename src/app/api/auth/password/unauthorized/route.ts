export async function GET() {
  return Response.json(
    {
      message: 'Unauthorized',
    },
    {
      status: 401,
    },
  )
}
