import { MouseEventHandler, useEffect, useState } from 'react';
import { resolveAvatarUrl } from '../services/avatar';
import './Avatar.css';

interface AvatarProps {
  source: string;
  alt: string;
  onClick?: MouseEventHandler<HTMLImageElement>;
}

function Avatar({ source, alt, onClick }: AvatarProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setFailed(false);

    if (source.startsWith('https://')) {
      setUrl(source);
      return () => controller.abort();
    }

    setUrl(null);
    resolveAvatarUrl(source, controller.signal)
      .then(setUrl)
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setFailed(true);
      });

    return () => controller.abort();
  }, [source]);

  if (failed) {
    return <div className="avatar-fallback" role="img" aria-label={`${alt}的头像加载失败`}>头像加载失败</div>;
  }

  if (!url) {
    return <div className="avatar-loading" aria-label="头像加载中">加载中…</div>;
  }

  return <img src={url} alt={alt} onClick={onClick} onError={() => setFailed(true)} />;
}

export default Avatar;
