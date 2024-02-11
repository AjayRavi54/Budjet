const express = require("express");
const cors = require("cors");
const app = express();
const fs = require("fs");
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.post("/tocheck/user", async (req, res) => {
  const getuser = req.body.name;
  const getpass = req.body.pass;

  const json = await fs.readFileSync("login.json", "utf8");
  obj = JSON.parse(json);
  ans = obj.map((ob) => ob.name);
  passes = obj.map((ob) => ob.pass_word);
  if (ans.includes(getuser)) {
    ind = ans.indexOf(getuser);
    if (passes[ind] == getpass) {
      res.send("ok");
    } else {
      res.send("wrong pass");
    }
  } else {
    res.send("user invalid");
  }
});
app.post("/set", async (req, res) => {
  const json = await fs.readFileSync("login.json", "utf8");
  obj = JSON.parse(json);
  new_obj = {
    name: req.body.name,
    email: req.body.email,
    pass_word: req.body.pass,
    salary: 0,
    expensoves: [
      ["January", []],
      ["February", []],
      ["April", []],
      ["May", []],
      ["June", []],
      ["July", []],
      ["August", []],
      ["September", []],
      ["October", []],
      ["November", []],
      ["December", []],
    ],
  };
  ans = obj.filter(
    (ob) => ob.name == new_obj.name || ob.email == new_obj.email
  );

  if (ans.length !== 0) {
    res.send("user name or email alredy exit");
  } else {
    obj.push(new_obj);

    js = JSON.stringify(obj, null, 2);
    fs.writeFileSync("login.json", js);
    res.send("ok");
  }
});
app.post("/table", async (req, res) => {
  username = req.body.name;
  const json = await fs.readFileSync("login.json", "utf8");
  obj = JSON.parse(json);
  ans = obj.filter((ob) => ob.name == username);
  res.send(ans);
});
app.post("/setsal", async (req, res) => {
  const json = await fs.readFileSync("login.json", "utf8");
  arr = JSON.parse(json);
  findarr = arr.map((ob) => ob.name);
  ind = findarr.indexOf(req.body.name);
  arr[ind].salary = req.body.salary;
  js = JSON.stringify(arr, null, 2);
  fs.writeFileSync("login.json", js);
});
app.post("/setexp", async (req, res) => {
  num = parseInt(req.body.amount);
  const json = await fs.readFileSync("login.json", "utf8");
  arr = JSON.parse(json);
  findarr = arr.map((ob) => ob.name);
  ind = findarr.indexOf(req.body.name); //user index in json
  monthofind = arr[ind].expensoves.map((a) => a[0]);
  monthind = monthofind.indexOf(req.body.month); //index of month
  if (monthind == -1) {
    monthind = 0;
  }
  resofind = arr[ind].expensoves[monthind][1].map((a) => a[0]);
  resind = resofind.indexOf(req.body.reason); //index of reason
  if (resind == -1) {
    arr[ind].expensoves[monthind][1].push([req.body.reason, num]);
    js = JSON.stringify(arr, null, 2);
    fs.writeFileSync("login.json", js);
    res.send(true);
  } else {
    arr[ind].expensoves[monthind][1][resind][1] =
      arr[ind].expensoves[monthind][1][resind][1] + num;

    js = JSON.stringify(arr, null, 2);
    fs.writeFileSync("login.json", js);
    res.send(true);
  }
});
app.post("/todel", async (req, res) => {
  const json = await fs.readFileSync("login.json", "utf8");
  arr = JSON.parse(json);
  findarr = arr.map((ob) => ob.name);
  ind = findarr.indexOf(req.body.name);

  arr[ind].expensoves[req.body.i][1].splice(req.body.d, 1);
  js = JSON.stringify(arr, null, 1);
  fs.writeFileSync("login.json", js);

  res.send("ok");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
//http://localhost:5000
