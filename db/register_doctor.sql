INSERT INTO doctor(first_name, last_name, email, password, office, pin)
VALUES (${first_name}, ${last_name}, ${email}, ${password}, ${office}, ${pin})
RETURNING id, first_name, last_name, email, password, office, pin;