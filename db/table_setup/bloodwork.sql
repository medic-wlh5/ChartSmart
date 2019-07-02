create table bloodwork(
bloodwork_id serial primary key,
test varchar(200),
value decimal,
visit int references visit(visit_id)
)