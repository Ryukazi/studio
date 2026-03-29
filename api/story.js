const axios = require("axios");

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "Missing Instagram URL"
    });
  }

  try {
    const cleanUrl = url.split("?")[0];

    const response = await axios.get(
      "https://api.videodropper.app/allinone",
      {
        params: { url: cleanUrl },
        timeout: 15000,
        headers: {
          "accept": "*/*",
          "user-agent":
            "Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 Chrome/137 Mobile Safari/537.36",
          "origin": "https://fastvideosave.net",
          "referer": "https://fastvideosave.net/",
          "x-requested-with": "XMLHttpRequest"
        }
      }
    );

    const data = response.data;

    if (!data || !data.video) {
      return res.status(404).json({
        status: false,
        message: "No video found"
      });
    }

    return res.status(200).json({
      video: data.video,
      x: true
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: err.message
    });
  }
};
