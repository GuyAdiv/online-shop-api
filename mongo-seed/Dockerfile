FROM mongo

COPY products.json /products.json

CMD mongoimport --host mongodb --db shop --collection products --type json --file /products.json
