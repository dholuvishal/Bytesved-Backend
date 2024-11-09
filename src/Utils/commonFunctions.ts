import fs from "fs";

const deleteFile = (filePath: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Error deleting file: ${err}`);
          reject(err);
        } else {
          console.log(`File deleted successfully: ${filePath}`);
          resolve();
        }
      });
    });
  };
  
export default deleteFile;
