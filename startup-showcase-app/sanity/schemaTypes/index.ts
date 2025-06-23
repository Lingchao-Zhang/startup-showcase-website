import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from './author'
import { startupType } from './startup'
import { playlistType } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, startupType, playlistType],
}
