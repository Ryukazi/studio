import axios from "axios";

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({
      status: false,
      message: "Missing Instagram URL"
    });
  }

  try {
    // Step 1: Send request like browser (IMPORTANT)
    const response = await axios.get("https://api.videodropper.app/allinone", {
      params: { url },
      headers: {
        "accept": "*/*",
        "user-agent":
          "Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 Chrome/137 Safari/537.36",
        "origin": "https://fastvideosave.net",
        "referer": "https://fastvideosave.net/"
      }
    });

    const data = response.data;

    // Step 2: Format response like you want
    if (!data || !data.video) {
      return res.status(404).json({
        status: false,
        message: "No video found"
      });
    }

    const result = data.video.map((item) => ({
      video: item.video,
      thumbnail: item.thumbnail
    }));

    return res.status(200).json({
      video: result,
      x: true
    });

  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "API error",
      error: err.message
    });
  }
}
