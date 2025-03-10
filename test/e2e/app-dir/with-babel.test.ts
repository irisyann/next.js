import { createNext, FileRef } from 'e2e-utils'
import { NextInstance } from 'test/lib/next-modes/base'
import { renderViaHTTP } from 'next-test-utils'
import path from 'path'
import cheerio from 'cheerio'

describe('with babel', () => {
  if ((global as any).isNextDeploy) {
    it('should skip next deploy for now', () => {})
    return
  }

  let next: NextInstance

  beforeAll(async () => {
    next = await createNext({
      files: new FileRef(path.join(__dirname, 'with-babel')),
      dependencies: {
        react: '0.0.0-experimental-9cdf8a99e-20221018',
        'react-dom': '0.0.0-experimental-9cdf8a99e-20221018',
      },
    })
  })
  afterAll(() => next.destroy())

  it('should support babel in app dir', async () => {
    const html = await renderViaHTTP(next.url, '/')
    const $ = cheerio.load(html)
    expect($('h1').text()).toBe('hello')
  })
})
