SELECT
employees.id,
employees.full_name,
employees.phone,
employees.position,
users.email,
roles.name AS role
FROM employees
JOIN users ON employees.user_id = users.id
JOIN roles ON users.role_id = roles.id;