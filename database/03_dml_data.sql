-- ============================================
-- Archivo: 03_dml_data.sql
-- Descripción: Inserción de datos (DML)
-- ============================================

USE AlkeWallet;

-- Usuarios
INSERT INTO usuario (nombre, email, saldo) VALUES
('Juan Pérez', 'juan@mail.com', 5000),
('María Gómez', 'maria@mail.com', 8000),
('Carlos Soto', 'carlos@mail.com', 3000),
('Ana Torres', 'ana@mail.com', 12000),
('Luis Rojas', 'luis@mail.com', 1500);

-- Monedas
INSERT INTO moneda (currency_name, currency_symbol) VALUES
('Peso Chileno', 'CLP'),
('Dólar Americano', 'USD');

-- Transacciones
INSERT INTO transaccion (user_id, currency_id, monto) VALUES
(1, 1, -1000),
(2, 1, -2000),
(3, 2, 500),
(4, 1, -3000),
(5, 2, 700);
