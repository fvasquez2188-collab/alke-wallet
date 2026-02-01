-- ============================================
-- Archivo: 06_views.sql
-- Descripción: Vistas SQL
-- ============================================

USE AlkeWallet;

-- Vista: Top 5 usuarios con mayor saldo
CREATE VIEW top_usuarios AS
SELECT nombre, saldo
FROM usuario
ORDER BY saldo DESC
LIMIT 5;

-- Consulta de la vista
SELECT * FROM top_usuarios;
