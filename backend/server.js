import "./src/config/env.config.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
