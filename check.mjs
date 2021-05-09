import { readdirSync, statSync } from 'fs';
import { join as pathJoin } from 'path';

const checkFilesWithExtensionExist = (extension, initPath) => {
    const allFilenames = [];

    const getAllFilenames = (dirPath) => {

        const directoryContent = readdirSync(dirPath);

        directoryContent.forEach(item => {
            const absPath = pathJoin(dirPath, item);
            statSync(absPath).isDirectory() ? getAllFilenames(absPath) : allFilenames.push(item);
        });

    };

    getAllFilenames(initPath);

    const fileIndex = allFilenames.findIndex(item => item.match(/(?:\.([^.]+))?$/)[1] === extension);
    
    return fileIndex !== -1;
}

let res;

try {
    res = checkFilesWithExtensionExist('ts', './src');
} catch (e) {
    res = false;
}