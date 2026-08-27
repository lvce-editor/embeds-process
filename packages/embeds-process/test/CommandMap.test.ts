import { test, expect } from '@jest/globals'
import * as CommandMap from '../src/parts/CommandMap/CommandMap.ts'
import * as ElectronWebContentsView from '../src/parts/ElectronWebContentsView/ElectronWebContentsView.ts'

test('commandMap', () => {
  expect(typeof CommandMap.commandMap).toBe('object')
  expect(CommandMap.commandMap['ElectronWebContents.handleWindowOpen']).toBe(ElectronWebContentsView.handleWindowOpen)
})
