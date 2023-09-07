use employees_db;

insert into department (name) values 
('Sales');

insert into role (title, salary, department_id) values ('Sales Assosciate', 80000, 1);

insert into employees (first_name, last_name, role_id, manager_id) values ('John', 'Smith', 1, null);

