const http = require("http");
const url = require("url");
const getTweetText = require("./get_tweet");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    // Route Handling
    if (parsedUrl.pathname === "/tweet") {
        try {
            const queryObject = parsedUrl.query;
            if (!queryObject.url) {
                res.statusCode = 400;
                res.setHeader("Content-Type", "text/plain");
                res.end("Error: Missing 'url' query parameter\n");
                return;
            }

            // Fetch tweet text (ensure it's an async function)
            const content = await getTweetText(queryObject.url);

            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            res.end(`${content}`);
        } catch (error) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "text/plain");
            res.end(`Error: ${error.message}\n`);
        }
    } else {
        // Default response for other paths
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/plain");
        res.end("Not Found\n");
    }
});

// Start server
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
