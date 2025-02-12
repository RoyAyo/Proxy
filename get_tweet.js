const axios = require("axios");
const cheerio = require("cheerio");

// Function to convert Twitter URL to Nitter alternative (if needed)
function convertTwitterUrlToNitter(tweetUrl) {
    return tweetUrl.replace("twitter.com", "nitter.net").replace("x.com", "nitter.net");
}

// Request headers
const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    "Accept-Encoding": "gzip, deflate, br",
    "DNT": "1",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
};

// Function to get tweet text
async function getTweetText(tweetUrl) {
    try {
        const nitterUrl = convertTwitterUrlToNitter(tweetUrl);
        const response = await axios.get(nitterUrl, { headers });
        
        const $ = cheerio.load(response.data);
        const tweetText = $(".tweet-content").text().trim();

        console.log("Tweet Text:", tweetText);
        return tweetText || "Tweet text not found.";
    } catch (error) {
        console.error("Error occurred:", error.message);
        return null;
    }
}


module.exports = getTweetText;
