import app from "./src/app";
import {connectToDB} from "./src/config/database";

connectToDB()
const port = process.env.PORT || 3000;
app.listen(port, () => {
    /* eslint-disable no-console */
    console.log(`Listening: http://localhost:${port}`);
    /* eslint-enable no-console */
});