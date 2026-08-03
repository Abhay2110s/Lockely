import app from "./app.js";

const startServer = async () => {
    try {
        app.listen(3000, () => {
            console.log("=====================");
            console.log(" Server Started ");
            console.log("=====================");
        });
    } catch (err) {
        console.log("Error:", err.message);
    }
};

startServer();