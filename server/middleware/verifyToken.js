import crypto from "crypto";

function verifyToken() {
  return async (req, res, next) => {
    try {
      const telegramInitData = req.body.initData;
      const TELEGRAM_BOT_TOKEN = process.env.VERIFY_TOKEN;

      const initData = new URLSearchParams(telegramInitData);
      const hash = initData.get("hash");
      initData.delete("hash");

      const dataToCheck = [...initData.entries()]
        .map(([key, value]) => `${key}=${decodeURIComponent(value)}`)
        .sort()
        .join("\n");

      const secretKey = crypto
        .createHmac("sha256", "WebAppData")
        .update(TELEGRAM_BOT_TOKEN)
        .digest();

      const computedHash = crypto
        .createHmac("sha256", secretKey)
        .update(dataToCheck)
        .digest("hex");

      if (computedHash !== hash) {
        next(new Error("Forbidden"));
      }

      req.user = JSON.parse(initData.get("user"));

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default verifyToken;
