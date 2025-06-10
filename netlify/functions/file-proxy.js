exports.handler = async (event) => {
  const path = event.path;
  if (!path) {
    return {
      statusCode: 400,
      body: [
        `Missing file path`,
        `— event.path:       ${event.path}`,
        `— rawQueryString:   ${event.rawQueryString}`,
        `— queryStringParams: ${JSON.stringify(event.queryStringParameters)}`,
      ].join('\n')
    };
  }

  const cleanPath = path.replace(/\\/g, '').replace(/^\//, '');
  const githubUrl = `https://raw.githubusercontent.com/GE-Union/CourseBank/main/${cleanPath}`;

  // map extensions → MIME
  const mimes = {
    pdf:   'application/pdf',
    docx:  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    zip:   'application/zip',
    ipynb: 'application/x-ipynb+json',
    txt:   'text/plain',
  };
  const ext = cleanPath.split('.').pop().toLowerCase();
  const contentType = mimes[ext] || 'application/octet-stream';

  // fetch the file
  const resp = await fetch(githubUrl, {
    headers: { 'User-Agent': 'Netlify-Function' }
  });
  if (!resp.ok) {
    return {
      statusCode: resp.status,
      body: `Failed to fetch ${githubUrl}`
    };
  }

  const buffer = await resp.arrayBuffer();
  const filename = cleanPath
    .split('/')
    .pop()
    .replace(/_/g, ' ')
    .replace(/-a-/, ' - ');

  return {
    statusCode: 200,
    headers: {
      'Content-Type': contentType,
      // force inline so PDFs open in‐browser
      'Content-Disposition': `inline; filename="${filename}"`
    },
    isBase64Encoded: true,
    body: Buffer.from(buffer).toString('base64')
  };
};
