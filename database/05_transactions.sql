-- ============================================
-- Archivo: 05_transactions.sql
-- Descripción: Transacciones y ACID
-- ============================================

USE AlkeWallet;

-- Transacción exitosa
START TRANSACTION;

INSERT INTO transaccion (user_id, currency_id, monto)
VALUES (1, 1, -500);

UPDATE usuario
SET saldo = saldo - 500
WHERE user_id = 1;

COMMIT;

-- Transacción fallida con ROLLBACK
START TRANSACTION;

INSERT INTO transaccion (user_id, currency_id, monto)
VALUES (999, 1, -1000); -- Usuario inexistente

ROLLBACK;
