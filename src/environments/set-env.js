/**
 * Установка переменных окружения для деплоя через Vercel.
 */
function setEnv() {
  fs = require('fs');
  writeFile = fs.writeFile;
  targetPath = '/vercel/path0/src/environments/environment.ts';
  targetPath2 = '/vercel/path0/src/environments/environment.prod.ts';

  envConfigFile = process.env.LOCATION_IQ_KEY;

  writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log('Angular environment.ts file generated correctly at' + targetPath + '\n');
    }
  });
  writeFile(targetPath2, envConfigFile, function (err) {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log('Angular environment.prod.ts file generated correctly at' + targetPath2 + '\n');
    }
  });
}

setEnv();

// export const environment = {
//   locationIqKey: 'pk.32e32e202a967db77d56fa9b983d78ee',
//   production: true
// };
