import fs from 'fs-extra';

export default function copyTask(from, to) {
  return new Promise((resolve, reject) => {
    console.log(`Copying from ${from} to ${to}...`);

    fs.copy(from, to, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
