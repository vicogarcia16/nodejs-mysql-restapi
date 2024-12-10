import { db } from "../db.js";
export const ping =  async (req, res) => {
    const [result] = await db.query("SELECT 1 + 1 AS result")
    res.json(result[0])
}