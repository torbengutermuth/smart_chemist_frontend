# SMART Chemist Frontend

## Architecture

App.js is the central component. It is bound to an element in the index.html. All other components are initialized by the central app. All requests to the backend server are done through the central app. Communication of components with each other is orchestrated by components creating events and the central app forwarding these to their intended destinations.

## Standalone Setup

Any HTTP server that can serve files statically will work. Run this command to use the python3 http server:

```
python3 -m http.server
```

This will start a server at: http://127.0.0.1:8000/

## Test

Once again start your HTTP server and navigate to http://<your test server root>/test/test.html

## Docs

Documentation is written in general JSDoc style. One generator is https://github.com/jsdoc/jsdoc. Using that and the command:

```
jsdoc src/*.js -d doc
```

... will create a `doc` directory. Navigate to http://<your test server root>/doc/index.html to actually read the docs.
