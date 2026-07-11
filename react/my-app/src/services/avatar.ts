export interface AvatarResolveResponse {
  url: string;
}

export async function resolveAvatarUrl(
  source: string,
  signal?: AbortSignal,
): Promise<string> {
  const response = await fetch('/api/avatar/resolve', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ source }),
    signal,
  });

  if (!response.ok) {
    throw new Error(`头像解析失败：${response.status}`);
  }

  const data = (await response.json()) as AvatarResolveResponse;

  if (!data.url?.startsWith('https://')) {
    throw new Error('后端没有返回有效的 HTTPS 头像地址');
  }

  return data.url;
}
