#zero downtime deployment nextjs without vercel

echo "Deploy starting..."

git stash push --include-untracked

git pull

npm install || exit

blitz prisma migrate deploy

npx prisma generate

sed -i 's/CountryFilter, CountryFilter, /CountryFilter, /' db/zod/user.ts
sed -i 's/FeeType, FeeType, /FeeType, /' db/zod/transaction.ts

BUILD_DIR=temp blitz build || exit

if [ ! -d "temp" ]; then
  echo '\033[31m temp Directory not exists!\033[0m'
  exit 1;
fi


rm -rf .next

mv temp .next

pm2 reload leela --update-env

sleep 2

# curl https://leela.game/api/queues/?secret=1ee1a

echo "Deploy done."

#make sure `next.config.js` it set `distDir: process.env.BUILD_DIR`
