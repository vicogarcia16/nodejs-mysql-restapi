import { db } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await db.query("CALL GetEmployees()");
    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query("CALL GetEmployee(?)",[id]);
    if (rows.length <= 0)
      return res.status(404).json({ message: "Employee not found" });
    res.send(rows[0][0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createEmployee = async (req, res) => {
  try {
    const { name, salary } = req.body;
    const [rows] = await db.query("CALL CreateEmployee(?, ?)",[name, salary]);
    res.send({
      id: rows[0][0].id,
      name,
      salary,
    });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, salary } = req.body;
    const [result] = await db.query("CALL UpdateEmployee(?, ?, ?)",[id, name, salary]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Employee not found" });

    const [rows] = await db.query("CALL GetEmployee(?)",[id]);
    res.send(rows[0][0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const [result] = await db.query("CALL DeleteEmployee(?)", [id]);
    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Employee not found" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
