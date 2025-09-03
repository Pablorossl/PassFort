from passfort import validador

def test_security_level_high():
    pwd = "Aa1!Aa1!Aa1!Aa1!"
    result = validador.validar_contrasena(pwd)
    assert "high" in result.lower() or "very high" in result.lower()