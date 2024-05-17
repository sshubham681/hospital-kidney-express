const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

var users = [
  {
    name: "Shubham",
    kidneys: [{ healthy: false }, { healthy: true }],
  },
];

app.get("/", (req, res) => {
  const userKidneys = users[0].kidneys;
  console.log(userKidneys, "userKidneyyyy");
  const numberOfKidneys = userKidneys.length;
  let healthyKidneys = userKidneys.filter((el) => el.healthy).length;
  res.json({
    numberOfKidneys,
    healthyKidneys,
  });
});

//post
app.post("/", function (req, res) {
  const isHealthy = req.body.isHealthy;
  users[0].kidneys.push({
    healthy: isHealthy,
  });
  res.send("Operation Done!");
});

// put
app.put("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.send("Put Operation Done!");
});

//delete
app.delete("/", function (req, res) {
  if (isAnyUnhealty()) {
    const newKidneys = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy == false) {
        newKidneys.push({
          healthy: true,
        });
      }
    }
    users[0].kidneys = newKidneys;
    res.send("Deleted Kidney");
  } else {
    res.status(411).json({
      msg: "You don't have any unhealthy kidneys",
    });
  }
});

function isAnyUnhealty() {
  let atleastOneUnhealthyKidney = false;
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys.healthy) {
      atleastOneUnhealthyKidney = true;
    }
  }
  console.log(atleastOneUnhealthyKidney, "atleast");
  return atleastOneUnhealthyKidney;
}

app.listen(8085, () => {
  console.log("Server is running");
});
// query param example
// function sum(n) {
//   let ans = 0;
//   for (let i = 1; i <= n; i++) {
//     ans += i;
//   }
//   console.log(ans);
//   return ans;
// }
// app.get("/", (req, res) => {
//   const n = req.query.n;
//   let data = sum(n);
//   res.send("hi your ans is " + data);
// });
