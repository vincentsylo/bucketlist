import { exec } from 'child_process';

export default function execTask(command) {
  return new Promise((resolve, reject) => {
    console.log(`Running "${command}"...`);

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.log(err);

        reject();
      }

      process.stderr.write(stderr);
      process.stdout.write(stdout);

      resolve();
    });
  });
}
