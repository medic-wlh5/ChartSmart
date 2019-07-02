select p.id, p.first_name, p.last_name, p.dob
from patient p
join cases c on c.patient_id = p.id
where c.doctor_id = ${id}