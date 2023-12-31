drop database if exists employees_db;

create database employees_db;

use employees_db;

create table department(
    id int not null auto_increment  primary key,
    name varchar(30)
   
);


create table role(
    id int not null auto_increment primary key,
    title varchar(40),
    salary decimal, 
    department_id int,
    foreign key (department_id) references department(id)
    
);


create table employees(
    id int not null auto_increment primary key,
    first_name varchar(20) not null, 
    last_name varchar(20) not null,
    role_id int,
    manager_id int,
    foreign key (manager_id) references employees(id),
    foreign key (role_id) references role(id)
    
);