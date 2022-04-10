# Flight router

### Getting started

#### Software requirements
- [Docker](https://www.docker.com "Docker")
- [Node.js](https://nodejs.org "Node.js") v16.14.0 or higher

#### Running the Application Locally

Running it for the first time could take some time because of DB initialization scripts.
Have a coffee(or two... ¯\_(ツ)_/¯) 


The easy way of running it:

```
docker-compose up -d
```

In case you really want to see what's going on:

1. Create `.env` file in project's root directory:
```
cp .env.example .env
```
2. Run only database:
```
docker-compose up -d postgres
```
3. Run the service in dev mode

```
npm run dev
```

### API request

Request to get a flight route:

GET ``localhost:3000/flights/getRoute?start=TLL&destination=JFK``

Response example: 

```
{
    "start": "EETN",
    "destination": "KJFK",
    "distance": 6727,
    "flights": [
        {
            "start": "TLL",
            "startName": "Lennart Meri Tallinn Airport",
            "destination": "HEL",
            "destinationName": "Helsinki Vantaa Airport",
            "distance": 101
        },
        {
            "start": "HEL",
            "startName": "Helsinki Vantaa Airport",
            "destination": "JFK",
            "destinationName": "John F Kennedy International Airport",
            "distance": 6626
        }
    ]
}
```
### Flight routing

The routing is done inside Postgres DB with Dijkstra's algorithm, using `PostGIS` and `pgrouting` extensions.


### DB Data

There is lack of quality flight route data.
For testing purposes, you can add a new route yourself:

```
INSERT INTO routes (start, destination) VALUES ('TLL', 'AUH');
```






