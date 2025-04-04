import 'server-only'
import { createClient } from 'next-sanity'

import { apiVersion, token, dataset, projectId } from '../env'

export const clientWrite = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
  token
})

if(!clientWrite.config().token){
  throw new Error("Missing environment variable: CLIENT_WRITE_TOKEN")
}