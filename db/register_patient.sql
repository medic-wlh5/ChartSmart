insert into patient(first_name, last_name, email, password, dob, doctor_pin)
values(${first_name}, ${last_name}, ${email}, ${password}, ${DOB}, ${doctor_pin})
returning id, first_name, last_name, email, dob, doctor_pin