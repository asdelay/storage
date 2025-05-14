'use client';
import { cn, convertFileToUrl, getFileType } from '@/src/lib/utils';
import React, { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from './ui/button';
import Image from 'next/image';
import Thumbnail from './ui/Thumbnail';
import { MAX_FILE_SIZE } from '../../constants';
import { toast } from 'sonner';
import { uploadFile } from '@/src/lib/actions/file.actions';
import { usePathname } from 'next/navigation';

interface FileUploaderProps {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader: FC<FileUploaderProps> = ({
  ownerId,
  accountId,
  className,
}) => {
  const path = usePathname();
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => file.name !== f.name)
          );
          toast(`${file.name} is too large. Max file size is 50MB`);
        }

        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prev) => {
                return prev.filter((f) => f.name !== file.name);
              });
            }
          }
        );
      });
      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prev) => prev.filter((prevFile) => fileName !== prevFile.name));
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className={cn('uploader-button', className)}>
        <Image
          src={'/assets/icons/upload.svg'}
          alt="upload"
          width={24}
          height={24}
        />
        <p>Upload</p>
        {files !== undefined && files?.length > 0 && (
          <ul className="uploader-preview-list text-left">
            <h4 className="h4 text-light-100">Uploading</h4>
            {files.map((file, index) => {
              const { type, extension } = getFileType(file.name);
              return (
                <li
                  key={`${file.name} - ${index}`}
                  className="uploader-preview-item"
                >
                  <div className="flex items-center gap-3">
                    <Thumbnail
                      type={type}
                      extension={extension}
                      url={convertFileToUrl(file)}
                    />
                    <div className="preview-item-name text-light-100">
                      {file.name}
                      <Image
                        src="/assets/icons/file-loader.gif"
                        alt="Loader"
                        width={80}
                        height={26}
                      />
                    </div>
                  </div>
                  <Image
                    src="/assets/icons/remove.svg"
                    width={24}
                    height={24}
                    alt="Remove"
                    onClick={(e) => handleRemoveFile(e, file.name)}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </Button>
    </div>
  );
};

export default FileUploader;
