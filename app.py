import flask
from flask import Flask
from flask import render_template
from flask import request


from us_addr_parse import parse_address

app = Flask(__name__)

@app.route('/url_parser')
def url_parser():
    return render_template('url_parser.html')

@app.route('/address-parser', methods=['GET'])
def address_parsere():
    parsed_address = ''
    if request.args.get('address'):
        address = request.args.get('address')
        parsed_address = parse_address(address)
        print parsed_address
        return flask.jsonify(**parsed_address[0])
    else:
        return render_template('address_parser.html', parsed_address=parsed_address)


@app.route('/tests')
def tests():
    return render_template('testing_page.html')

if __name__ == "__main__":
    app.run()
