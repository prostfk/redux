CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username NVARCHAR(50),
    password NVARCHAR(255),
    role NVARCHAR(20),
    name NVARCHAR(50),
    surname NVARCHAR(50),
    email NVARCHAR(150),
    birth_day DATE,
    company_id INT,
    FOREIGN KEY (company_id) REFERENCES company(id)
)