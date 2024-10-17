import getIp from '@/utils/get-ip'
import type { NextRequest } from 'next/server'
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid'

const NAMESPACE = '99480b57-8bc9-4f35-94b1-6b5f675dbce6'

export async function generateDistinctId(req?: NextRequest) {
  const ip = await getIp(req)
  if (!ip) return uuidv4()
  return uuidv5(ip, NAMESPACE)
}
