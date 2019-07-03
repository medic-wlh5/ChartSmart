insert into visit(date, cases)
values 
(${date}, ${caseId})
returning visit_id