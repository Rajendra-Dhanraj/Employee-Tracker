INSERT INTO department (department_name)
values 
('Sales'), 
('Engineering'), 
('Finance'), 
('Legal');

INSERT INTO roles (title, salary, department_id)
values
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id)
values
('John', 'Doe', 1),
('Mike', 'Chan', 2),
('Ashley', 'Rodriguez', 3),
('Kevin', 'Tupic', 4),
('Malia', 'Brown', 5),
('Sarah', 'Lourd', 6),
('Tom', 'Allen', 7),
('Christian', 'Eckenrode', 3);

UPDATE employee SET manager_id = 3 WHERE role_id = 1;
UPDATE employee SET manager_id = 1 WHERE role_id = 2;
UPDATE employee SET manager_id = 3 WHERE role_id = 4;
UPDATE employee SET manager_id = 6 WHERE role_id = 7;
UPDATE employee SET manager_id = 2 WHERE role_id = 2;
