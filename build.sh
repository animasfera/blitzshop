#zero downtime deployment nextjs without vercel

echo "Deploy starting..."

git stash push --include-untracked

git pull

npm install || exit

blitz prisma migrate deploy

npx prisma generate

BUILD_DIR=temp blitz build || exit

if [ ! -d "temp" ]; then
  echo '\033[31m temp Directory not exists!\033[0m'
  exit 1;
fi


rm -rf .next

mv temp .next

pm2 reload shop --update-env

echo "Deploy done."

#make sure `next.config.js` it set `distDir: process.env.BUILD_DIR`
