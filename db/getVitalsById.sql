select v.date, vi.test, vi.value, p.id
from visit v
join cases c on c.case_id = v.cases
join vitals vi on vi.visit = v.visit_id
join patient p on p.id = c.patient_id
where p.id = ${id} and vi.test = ${test};