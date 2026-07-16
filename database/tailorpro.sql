use tailorpro;
CREATE TABLE users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);
CREATE TABLE orders(
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_name VARCHAR(100),
    phone VARCHAR(20),
    email VARCHAR(100),
    dress_type VARCHAR(50),
    chest DOUBLE,
    waist DOUBLE,
    shoulder DOUBLE,
    sleeve DOUBLE,
    height DOUBLE,
    weight DOUBLE,
    requirements TEXT
);