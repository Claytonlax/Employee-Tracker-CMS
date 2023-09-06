drop database if exists employees_db;

create database employees_db;

use employees_db;

create table employees(
    id int not null auto_increment,
    first_name varchar(20) not null, 
    last_name varchar(20) not null,
    title varchar(20),
    department varchar(40),
    salary int,
    manager varchar(40),
    primary key (id)

)

create table roles(
    id int not null auto_increment,
    title varchar(40),
    department varchar(40),
    salary int, 
    foreign key (employee_id) references employees(id),
    primary key (id)
)