import { expect, jest, test } from '@jest/globals'
import * as CreateEmbedsWorkerCommandExecutor from '../src/parts/CreateEmbedsWorkerCommandExecutor/CreateEmbedsWorkerCommandExecutor.ts'

test('injects the rpc into createWebContentsView', async () => {
  const rpc = { ipc: {} }
  const createWebContentsView = jest.fn()
  const execute = CreateEmbedsWorkerCommandExecutor.createEmbedsWorkerCommandExecutor(rpc, {
    'ElectronWebContentsView.createWebContentsView': createWebContentsView,
  })

  await execute('ElectronWebContentsView.createWebContentsView', 0, [])

  expect(createWebContentsView).toHaveBeenCalledWith(rpc, 0, [])
})

test('forwards other commands unchanged', async () => {
  const resizeWebContentsView = jest.fn()
  const execute = CreateEmbedsWorkerCommandExecutor.createEmbedsWorkerCommandExecutor(
    {},
    {
      'ElectronWebContentsView.resizeWebContentsView': resizeWebContentsView,
    },
  )

  await execute('ElectronWebContentsView.resizeWebContentsView', 1, 2, 3, 4, 5)

  expect(resizeWebContentsView).toHaveBeenCalledWith(1, 2, 3, 4, 5)
})

test('throws for an unknown command', () => {
  const execute = CreateEmbedsWorkerCommandExecutor.createEmbedsWorkerCommandExecutor({}, {})

  expect(() => execute('Unknown.command')).toThrow(new Error('Command not found Unknown.command'))
})
