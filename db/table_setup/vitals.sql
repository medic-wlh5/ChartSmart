create table vitals(
vitals_id serial primary key,
test varchar(200),
value decimal,
visit int references visit(visit_id))
