const mongoose = require("mongoose");
try {
  mongoose.connect(
    // "mongodb+srv://BhadreshGhevariya:bhadobhado@myfirstcluster.8pyjtyl.mongodb.net/?retryWrites=true&w=majority"
    "mongodb+srv://BhadreshGhevariya:z7nI1lfYLpZhELrc@myfirstcluster.8pyjtyl.mongodb.net/test"
  );
} catch (e) {
  console.log(e);
}
mongoose.connection.on("connected", function () {
  console.log("Application is connected to Database");
});

// mongodb+srv://BhadreshGhevariya:<password>@myfirstcluster.8pyjtyl.mongodb.net/?retryWrites=true&w=majority
