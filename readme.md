```javascript 
//use method get how params
app.get("/message/:id/:user", (request, response) => {
  const { user, id } = request.params

  response.send(`
   ID number: ${id}
   User name: ${user}
  `)
})
```

```javascript
//use method get how query
app.get("/users", (request, response) => {
  const { page, limits } = request.query

  response.send(`
    Page: ${page}
    Limits: ${limits}
  `)
})
```

