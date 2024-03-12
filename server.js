const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

app.get("/api/quotes/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

app.get("/api/quotes", (req, res, next) => {
  const queryPerson = req.query.person;
  if (queryPerson) {
    const quotesByPerson = {
      quotes: quotes.filter((quote) => quote.person === queryPerson),
    };
    res.send(quotesByPerson);
  } else {
    const allQuotes = { quotes: quotes };
    res.send(allQuotes);
    console.log(allQuotes);
  }
});

app.post("/api/quotes", (req, res, next) => {
  if (req.query.quote && req.query.person) {
    const newQuote = {
      quote: req.query.quote,
      person: req.query.person,
    };

    quotes.push(newQuote);
    res.status(204).send(newQuote);
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => console.log("listening to port: ", PORT));
