echo "Migrate starting..."

#blitz prisma migrate deploy
sed -i '' 's/CountryFilter, CountryFilter, /CountryFilter, /' db/zod/user.ts
sed -i '' 's/FeeType, FeeType, /FeeType, /' db/zod/transaction.ts


echo "Migrate done."
