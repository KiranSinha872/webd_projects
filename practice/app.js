const express = require("express");
const fs = require("fs").promises;

const app = express();
const port = 3000;

app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send(`
        <h1>Server Running</h1>
        <p>View Data: <a href="/data">/data</a></p>
    `);
});

// Register User
app.post("/register", async (req, res) => {
    try {
        const newUser = req.body;

        let users = [];

        try {
            const fileData = await fs.readFile("data.json", "utf-8");
            users = JSON.parse(fileData);
        } catch {
            users = [];
        }

        users.push(newUser);

        await fs.writeFile(
            "data.json",
            JSON.stringify(users, null, 2),
            "utf-8"
        );

        res.status(201).json({
            message: "User registration confirmed",
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to register user",
        });
    }
});

// Get All Users
app.get("/data", async (req, res) => {
    try {
        const data = await fs.readFile("data.json", "utf-8");

        const users = JSON.parse(data);

        res.json(users);
    } catch (error) {
        res.status(500).json({
            error: "Unable to fetch data",
        });
    }
});

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});