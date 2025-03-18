import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from './author'
import { startupType } from './startup'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, startupType],
}
