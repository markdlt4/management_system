-- Create the database seinfeld and specified it for use.
CREATE DATABASE employee_management;
USE employee_management;

-- Create the table actors.
CREATE TABLE department (
  id int AUTO_INCREMENT,
  name varchar(30) NOT NULL,
  
  PRIMARY KEY(id)
);
CREATE TABLE role (
  id int AUTO_INCREMENT,
  title varchar(30) NOT NULL,
  salary decimal NOT NULL,
  department_id INT,
  
  PRIMARY KEY(id)
);
CREATE TABLE employee (
  id int AUTO_INCREMENT,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  roll_id INT,
  manager_id INT,
  
  PRIMARY KEY(id)
);


-- -- Insert a set of records.
-- INSERT INTO actors (name, coolness_points, attitude) VALUES ("Jerry", 90, "relaxed");
-- INSERT INTO actors (name, coolness_points, attitude) VALUES ("Elaine", 80, "righteous");
-- INSERT INTO actors (name, coolness_points, attitude) VALUES ("Kramer", 20, "doofus");
-- INSERT INTO actors (name, coolness_points, attitude) VALUES ("George", 70, "selfish");
