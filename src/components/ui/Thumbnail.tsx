import { cn, getFileIcon } from '@/src/lib/utils';
import React, { FC } from 'react';
import Image from 'next/image';

interface Thumbnail {
  type: string;
  extension: string;
  url: string;
  imageClassName?: string;
  className?: string;
}
const Thumbnail: FC<Thumbnail> = ({
  type,
  extension,
  url = '',
  imageClassName,
  className,
}) => {
  const isImage = type === 'image' && extension !== 'svg';
  return (
    <figure className={cn('thumbnail', className)}>
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={
          (cn('size-8 object-contain'),
          imageClassName,
          (isImage && 'thumbnail-image') || '')
        }
      />
    </figure>
  );
};

export default Thumbnail;
