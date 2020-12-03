function etag(str) {
  var hash = 0;
  if (str.length == 0) {
    return hash;
  }
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = ((hash<<5)-hash)+char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return 'e-' + hash.toString();
}

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

  const body = `<html>
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

  return {
    statusCode: 200,
    headers: {
      'cache-control': control,
      'content-type': 'text/html; charset=utf-8',
      etag: etag(body)
    },
    body
  }
};
