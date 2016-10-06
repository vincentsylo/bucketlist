import fs from 'fs-extra';

export default function removeTask(path) {
  return new Promise((resolve, reject) => {
    console.log(`Removing ${path}...`);

    fs.remove(path, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
