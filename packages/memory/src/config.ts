import { join } from 'node:path'
import { root } from './root.ts'

export const instantiations = 1200

export const instantiationsPath = join(root, 'packages', 'embeds-process')
