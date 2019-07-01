create table cases (
case_id serial primary key,
patient_id int REFERENCES patient(id) on delete cascade,
doctor_id int references doctor(id) on delete cascade
)
