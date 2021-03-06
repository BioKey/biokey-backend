# biokey-backend

## Installation
```shell
git clone https://github.com/BioKey/biokey-backend.git
cd biokey-backend
npm install
```

## Testing
`npm test`

## Documentation
Document all routes as can be seen in the [auth routes](https://github.com/BioKey/biokey-backend/blob/master/routes/auth.js). Upon completion, run `npm run docs` and view the rendered documentation under `./docs`. Most recently rendered and committed documentation can be viewed [online](https://biokey.github.io/biokey-backend/).

## Authenticated Requests
To make authenticated requests pass a header with the authorized token.
```json
{
  "authorization": "tokenthatwasmade"
}
```
