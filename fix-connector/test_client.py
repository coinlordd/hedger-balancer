
"""
FIX tags:

https://fiximate.fixtrading.org/legacy/en/FIX.4.4/

"""

from time import sleep

from deus_v3_quickfix.client import client
from deus_v3_quickfix.order import order


# THIS CLIENT WAS USED ONLY FOR TESTING / AS A GUIDE, application.py contains all the neccessary methods

class tick_processor():

    def __init__(self):

        self.client = client(self, config_file='config/setup.cfg',
                             read_positions_from_file=False,  # to reload positions after restart
                             store_all_ticks=True,  # stores all incoming ticks (can be used for candlesticks)
                             save_history_to_files=True,  # to save the price history to file
                             verbose=False,  # to control the print output
                             message_log_file='messages.log',
                             # if the file names are set to an empty string, logger will be disabled.
                             execution_history_file='execution_history.log')

        self.trade_done = False
        self.cancel_done = False


        symbols = ['EURUSD','XAUUSD']

        for symbol in symbols:
            self.client.app.sender.send_MarketDataRequest(symbol)


    def get_quote(self, symbol):
        quote = self.client.app.sender.send_MarketDataRequest(symbol)
        print(quote)

    """
    # on_tick() is called for every incoming tick, override with intended logic/HedgerScript behavior
    
    for example: can be used to check whether accounts are margin compliant and liquidation thresholds are met
    """

    def on_tick(self, symbol, app):

        # # Symbol is the one that got a price or execution update.
        print('Price update for', symbol, '| bid:', app.history_dict[symbol].BID_TOB, '| ask:',
              app.history_dict[symbol].ASK_TOB)

        # access current bid/ask prices and order book sizes. 
        print('prices:', app.history_dict[symbol].BID, app.history_dict[symbol].ASK,
              ' | sizes:', app.history_dict[symbol].BID_SIZE, app.history_dict[symbol].ASK_SIZE)

        # access tick history (use HISTORY_TOB for top-of-book history):
        print('Symbol ticks received:', len(app.history_dict[symbol].HISTORY))

        # to generate candle data for a specific time frame:
        print(app.history_dict[symbol].resampled_history('bid', '5min'))

        # # open order can also be accessed through a dictionary app.open_orders. 
        print(symbol, 'open orders:', app.num_orders(symbol))

        # net positions can be accessed through a dictionary app.open_net_positions. 
        print(symbol, 'NET POSITION | filled:', app.net_position(symbol), '| canceled:',
              app.canceled_net_quantity[symbol])

        # to enter a trade:
        if not self.trade_done:
            self.trade_done = True

            # app.sender.send_OrderCancelRequest(1)

            # price = app.history_dict[symbol].ASK_TOB  # app.history_dict[symbol].ASK_TOB  # top of book ASK price

            # possible order_types: 'buy_market', 'buy_limit', 'buy_stop', 'sell_market', 'sell_limit', 'sell_stop'

            # price must only be given for limit or stop orders.
            _order = order(order_type='buy_market', symbol=symbol,
                           quantity=1)
            print('#----------------------------------------------------------------------#')
            print('isLoggedOn:', self.client.isLoggedOn())
            print('Sending order:')
            print(_order)

        # to send the order:
            app.sender.send_NewOrderSingle(_order)

    """
    # override this method with your own logic. 
    # it is executed on receiving a new execution report. 
    """

    def on_execution_report(self, report, app):
        # you can also access all historic execution reports through the list app.execution_history. 
        print('\nTrade Executed:')
        print(report)

        print('Open orders:')
        for key in app.open_orders.keys():
            print(key, '|', app.open_orders[key])


processor = tick_processor()
processor.get_quote("XAUUSD")
# keep the thread alive.
while processor.client.isLoggedOn():
    sleep(0.1)

processor.client.stop()
