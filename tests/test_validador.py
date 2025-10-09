from app import validador

def test_security_level_high():
    pwd = "Aa1!Aa1!Aa1!Aa1!"
    result = validador.validar_contrasena(pwd)
    assert "alto" in result.lower() or "muy alto" in result.lower()