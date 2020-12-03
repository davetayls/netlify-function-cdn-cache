exports.handler = async (event, context, callback) => {
  // Get the request URL
  const { path } = event;
  console.log("[request]", path);
  // path as:
  // /test/max-0/smax-3000
  // /test/max-/smax-0
  // /test/max-3000/smax-
  const [_, max, smax] = /^\/test\/max-(\d*)\/smax-(\d*)/.exec(path)

  const control = [
    'public',
    max ? `max-age=${max}` : null,
    smax ? `s-maxage=${smax}` : null,
    'stale-while-revalidate=30'
  ].filter(Boolean).join(', ')

  return {
    statusCode: 200,
    headers: {
      'Cache-Control': control
    },
    body: `<html>
<title>test</title>
<body>
<h1>${control}</h1>
<p>Release ${process.env.TEST_RELEASE || 0}</p>
<ul>
<li><a href="./a">a</a></li>
<li><a href="./b">b</a></li>
<li><a href="./c">c</a></li>
</ul>
</body></html>`
  }
};
