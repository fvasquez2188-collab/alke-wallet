-- ============================================
-- Archivo: 04_queries.sql
-- Descripción: Consultas SQL (SELECT)
-- ============================================

USE AlkeWallet;

-- Consulta básica
SELECT * FROM usuario;

-- Filtro con WHERE
SELECT nombre, saldo
FROM usuario
WHERE saldo > 4000;

-- JOIN entre usuario y transaccion
SELECT u.nombre, t.monto, t.fecha
FROM usuario u
INNER JOIN transaccion t
ON u.user_id = t.user_id;

-- Subconsulta: total de transacciones por usuario
SELECT nombre,
       (SELECT COUNT(*)
        FROM transaccion t
        WHERE t.user_id = u.user_id) AS total_transacciones
FROM usuario u;
