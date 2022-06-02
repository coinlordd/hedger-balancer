Must install quickfix package for python, use attached whl file if pip has errors.

test_client.py contains a simple implementation used to quote and send orders for XAUUSD and EURUSD on_tick and should be used as an implementation guideline.

application.py contains a richer suite of methods and capabilities.

setup.cfg in the /config/ folder allows the client to read the broker's credentials, attached in the tradeTest_Client (1)2.docx file (from the broker.)

Connection to the broker's trading env requires SSH. I used OpenSSL and Stunnel to do so, however others solutions will likely work as well.

Message Kareem with any questions you may have,
