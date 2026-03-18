export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  const apiKey = process.env.VITE_LOOP_API_KEY;
  const domain = process.env.VITE_LOOP_DOMAIN || "shipbob-markets-returnstest";

  if (!apiKey) return res.status(500).json({ error: "VITE_LOOP_API_KEY is not set in environment variables" });

  const { endpoint = "returns" } = req.query;

  try {
    let fullUrl, method, body;

    if (endpoint === "returns") {
      // Loop warehouse returns requires POST with pagination in body
      fullUrl = "https://api.loopreturns.com/api/v1/warehouse/return";
      method  = "POST";
      const page  = parseInt(req.query.page  || "1");
      const limit = parseInt(req.query.limit || "50");
      body = JSON.stringify({ page, limit });
    } else if (endpoint === "list") {
      // Regular returns list uses GET
      fullUrl = "https://api.loopreturns.com/api/v1/return";
      method  = "GET";
    } else {
      return res.status(400).json({ error: `Unknown endpoint: ${endpoint}` });
    }

    const headers = {
      "X-Authorization": apiKey.trim(),
      "x-loop-shop":     domain.trim(),
      "Content-Type":    "application/json",
      "Accept":          "application/json",
    };

    const fetchOpts = { method, headers };
    if (body) fetchOpts.body = body;

    const loopRes = await fetch(fullUrl, fetchOpts);
    const text    = await loopRes.text();

    if (!loopRes.ok) {
      return res.status(loopRes.status).json({
        error:   "Loop API error",
        status:  loopRes.status,
        url:     fullUrl,
        method,
        details: text,
        debug: {
          domain,
          hasKey:    !!apiKey,
          keyLength: apiKey.trim().length,
          keyStart:  apiKey.trim().slice(0, 6) + "...",
        },
      });
    }

    let data;
    try { data = JSON.parse(text); }
    catch { return res.status(500).json({ error: "Could not parse Loop response", raw: text.slice(0, 500) }); }

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: "Proxy fetch error", details: err.message });
  }
}
