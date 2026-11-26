# ************************************************************************** #
#      / \   _ __  __| |_   _|  \/  | __ _| | _____ _ __                     #
#     / _ \ | '__|/ _` | | | | |\/| |/ _` | |/ / _ \ '__|                    #
#    / ___ \| |  | (_| | |_| | |  | | (_| |   <  __/ |                       #
#   /_/   \_\_|   \__,_|\__,_|_|  |_|\__,_|_|\_\___|_|                       #
#                                                                            #
#   File: test_nombres.py    Project: portfolio                              #
#   Created: 2026/11/26 22:38:16  by vm                                      #
#   Updated: 2026/11/26 22:38:16  by vm                                      #
# ************************************************************************** #

"""El nombre de los PDF que se descargan."""

from app.nombres import disposicion, nombre_de_archivo, siglas


def test_siglas() -> None:
    assert siglas("NTT DATA") == "NTT DATA"
    assert siglas("Talkdesk, Lda.") == "Talkdesk"
    assert siglas("Banco Português de Investimento S.A.") == "BPI"
    assert siglas("Energias de Portugal") == "EP"


def test_nombre_y_disposicion() -> None:
    nombre = nombre_de_archivo(sigla="NTT DATA", cargo="Software Developer Júnior / 42")
    assert nombre == "NTT DATA - Software Developer Júnior 42 - Franco Dorrego.pdf"
    cabecera = disposicion(nombre, descargar=True)
    assert cabecera.startswith('attachment; filename="NTT DATA - Software Developer Jnior')
    assert "filename*=UTF-8''NTT%20DATA%20-%20Software%20Developer%20J%C3%BAnior" in cabecera
