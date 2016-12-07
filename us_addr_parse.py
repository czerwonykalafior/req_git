import usaddress

def parse_address(input_address):

    parsed_addres =  usaddress.tag(input_address)
    # parsed_addres =  json.dumps(parsed_addres)
    # print parsed_addres
    return  parsed_addres
