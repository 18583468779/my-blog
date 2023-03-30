docker start dc84d6d1c295 &&
cd /home/blog/app/ &&
git pull &&
npm install --production=false &&
npm run build &&
docker build -t xie/node-web-app . &&
docker kill sleepy_davinci &&
docker rm sleepy_davinci &&
docker run --name sleepy_davinci --network=host -p 3000:3000 -d xie/node-web-app &&

echo 'OK!'
