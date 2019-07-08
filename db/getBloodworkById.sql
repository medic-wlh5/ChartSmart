select v.date, b.test, b.value, p.id
from visit v
join cases c on c.case_id = v.cases
join bloodwork b on b.visit = v.visit_id
join patient p on p.id = c.patient_id
where p.id = ${id} and b.test = ${test};