'use client'
import React from 'react';
import { FileDto, FolderDto } from '@/Utils/types';

const FolderStructure = ({ DocOrFile }: { DocOrFile: FolderDto[] | FileDto[] }) => {
  // Function to check if an object is a file
  const isFile = (doc: FileDto | FolderDto): doc is FileDto => {
    return (doc as FileDto).body !== undefined; // Assuming `body` exists only on files
  };

  // Filter files that have no parent (orphaned files)
  const orphanedFiles = (DocOrFile as FileDto[]).filter((file) => isFile(file) && !file.parent);

  return (
    <div>
      <h3>Orphaned Files (No Parent)</h3>
      {orphanedFiles.length > 0 ? (
        <ul>
          {orphanedFiles.map((file) => (
            <li key={file._id}>{file.name}</li>
          ))}
        </ul>
      ) : (
        <p>No orphaned files.</p>
      )}
    </div>
  );
};

export default FolderStructure;
