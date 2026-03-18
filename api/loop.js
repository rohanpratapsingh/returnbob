export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") return res.status(200).end();

  const apiKey = process.env.VITE_LOOP_API_KEY;
  const domain = process.env.VITE_LOOP_DOMAIN || "shipbob-markets-returnstest";

  if (!apiKey) return res.status(500).json({ error: "VITE_LOOP_API_KEY is not set in environment variables" });

  const { endpoint = "returns" } = req.query;

  const ENDPOINTS = {
    returns: `https://api.loopreturns.com/api/v1/warehouse/return`,
    list:    `https://api.loopreturns.com/api/v1/return`,
  };

  const baseUrl = ENDPOINTS[endpoint];
  if (!baseUrl) {
    return res.status(400).json({ error: `Unknown endpoint: ${endpoint}` });
  }

  try {
    const params = new URLSearchParams();
    if (req.query.page)  params.set("page",  req.query.page);
    if (req.query.limit) params.set("limit", req.query.limit);
    const fullUrl = params.toString() ? `${baseUrl}?${params}` : baseUrl;

    const sbRes = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "X-Authorization": apiKey.trim(),
        "x-loop-shop":     domain.trim(),
        "Content-Type":    "application/json",
        "Accept":          "application/json",
      },
    });

    const text = await sbRes.text();

    if (!sbRes.ok) {
      return res.status(sbRes.status).json({
        error:   "Loop API error",
        status:  sbRes.status,
        url:     fullUrl,
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
