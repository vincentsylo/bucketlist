export default function chdirTask(folder) {
  return new Promise(resolve => {
    console.log(`Changing dir to "${folder}"...`);

    process.chdir(folder);

    resolve();
  });
}
