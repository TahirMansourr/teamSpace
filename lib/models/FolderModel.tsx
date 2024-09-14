import mongoose from 'mongoose';
import { fileSchema } from './FileModel';

const folderSchema = new mongoose.Schema({
    name: String,
    featureId: String,
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
    },
    // Unified children field holding both files and folders
    children: [
        {
          type: {
            type: String,
            enum: ['File', 'Folder'], // Distinguish between files and folders
          },
          // If it's a file, embed the file details
          file: fileSchema, // Embedded file schema
          // If it's a folder, reference another folder
          folder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Folder', // Referenced subfolder
          },
        },
      ],
    childrenType: {
        type: String,
        enum: ['File', 'Folder'], // Can be 'File' or 'Folder'
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    edits: [
        {
            editedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            editedAt: Date,
            editedContent: String,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Folder = mongoose.models.Folder || mongoose.model('Folder', folderSchema);
export default Folder;
