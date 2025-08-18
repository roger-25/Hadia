# Hadiya Products API

## How to run this application

1. Migrate the database using the database repo.
2. Run ```cp .env.development .env```
3. Change the values for ```PORT``` and ```DB_CONNECTION_STRING``` in the ```.env``` file
4. Start the application using ```npm run pm2start```
5. Stop the application using ```npm run pm2stop```
6. List the running apps using ```npm run pm2ls```
7. Check app logs using ```npm run pm2logs```