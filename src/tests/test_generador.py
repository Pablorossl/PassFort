import unittest
from app import generador

class TestGenerador(unittest.TestCase):
    def test_password_length(self):
        pwd = generador.generar_contrasena(12, True, True, True)
        self.assertEqual(len(pwd), 12)

    def test_password_types(self):
        pwd = generador.generar_contrasena(12, True, True, True)
        self.assertTrue(any(c.isupper() for c in pwd))
        self.assertTrue(any(c.isdigit() for c in pwd))
        self.assertTrue(any(not c.isalnum() for c in pwd))

if __name__ == "__main__":
    unittest.main()