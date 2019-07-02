create table visit (
visit_id serial primary key,
date varchar(200),
cases int references cases(case_id) on delete cascade
)