const express = require("express");
const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());

app.get("/push_noti", (request, response) => {
    response.status(200).send({
        chill_guy: '🤡'
    })
});


app.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
