USE db_crud;

CREATE TABLE IF NOT EXISTS employees (
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL
);

DELIMITER $$

-- Obtener todos los empleados
CREATE PROCEDURE GetEmployees()
BEGIN
  SELECT id, name, salary FROM employees;
END$$

-- Obtener un empleado por ID
CREATE PROCEDURE GetEmployee(IN emp_id INT)
BEGIN
  SELECT id, name, salary FROM employees WHERE id = emp_id;
END$$

-- Insertar un nuevo empleado
CREATE PROCEDURE CreateEmployee(IN emp_name VARCHAR(255), IN emp_salary DECIMAL(10, 2))
BEGIN
  INSERT INTO employees(name, salary) VALUES(emp_name, emp_salary);
  SELECT LAST_INSERT_ID() AS id;
END$$

-- Actualizar un empleado
CREATE PROCEDURE UpdateEmployee(IN emp_id INT, IN emp_name VARCHAR(255), IN emp_salary DECIMAL(10, 2))
BEGIN
  UPDATE employees 
  SET name = IFNULL(emp_name, name), salary = IFNULL(emp_salary, salary)
  WHERE id = emp_id;
END$$

-- Eliminar un empleado
CREATE PROCEDURE DeleteEmployee(IN emp_id INT)
BEGIN
  DELETE FROM employees WHERE id = emp_id;
END$$

DELIMITER ;
