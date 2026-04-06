const RAILWAY_ORIGIN = 'https://hcai-platform-production.up.railway.app';

const PROXY_PREFIXES = ['/api/', '/webhooks/', '/health', '/logo.png'];

function shouldProxy(path: string): boolean {
  // Exact matches and prefix matches for API/webhook/health/logo
  if (PROXY_PREFIXES.some((p) => path === p || path.startsWith(p))) return true;

  // /demoday and /demoday-vip → proxy to Railway (platform serves these)
  // But NOT /demoday-galeria, /demoday-brief, /demoday-invitacion (static in Pages)
  if (path === '/demoday' || path === '/demoday-vip') return true;

  // /demoday/* subpaths: /demoday/project/:id, /demoday/photos/:file, /demoday/covers/:file
  if (path.startsWith('/demoday/')) return true;

  return false;
}

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const path = url.pathname;

  if (!shouldProxy(path)) {
    return new Response('Not Found', { status: 404 });
  }

  const targetUrl = new URL(path + url.search, RAILWAY_ORIGIN);

  const headers = new Headers(context.request.headers);
  headers.set('Host', new URL(RAILWAY_ORIGIN).host);
  headers.set('X-Forwarded-For', context.request.headers.get('CF-Connecting-IP') || '');
  headers.set('X-Forwarded-Proto', 'https');
  headers.set('X-Forwarded-Host', url.hostname);

  const proxyRequest = new Request(targetUrl.toString(), {
    method: context.request.method,
    headers,
    body: context.request.body,
    redirect: 'manual',
  });

  const response = await fetch(proxyRequest);

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete('transfer-encoding');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
  });
};
