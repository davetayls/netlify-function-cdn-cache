
const FOO = 'bar'

export const getControl = (path) => {
  // path as:
  // /test/max-0/smax-3000
  // /test/max-/smax-0
  // /test/max-3000/smax-
  const [_, max, smax] = /\/max-(\d*)\/smax-(\d*)/.exec(path)

  const control = [
    'public',
    max ? `max-age=${max}` : null,
    smax ? `s-maxage=${smax}` : null,
    'must-revalidate'
  ].filter(Boolean).join(', ')

  return control
}

