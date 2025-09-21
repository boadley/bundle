curl -v -X POST http://localhost:3000/api/sponsor-transaction -H "Content-Type: application/json" -d @transaction.json

curl -v -X POST http://localhost:3000/api/resolve-account -H "Content-Type: application/json" -d @account.json

curl -v -X POST http://localhost:3000/api/initiate-payment -H "Content-Type: application/json" -d @payment.json

npm run dev
npx expo start --clear