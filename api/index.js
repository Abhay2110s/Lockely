import "../Backend/src/config/env.js";
import app from "../Backend/src/app.js";

export default function handler(req, res) {
  return app(req, res);
}
