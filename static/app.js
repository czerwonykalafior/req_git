'use strict';


var url_call = {
        base_url: '',
        parameters: {}
    },
    params,
    i;

// url_call.parameters.param constructor
function Paramet(name, value, type) {
    this.name = name;
    this.value = value;
    this.type = type;
}

var source_url,
    mine_url;


// make a url_call object, parse inpit to : base_url, parametrs {name, value, type}
function parse_url(input_url) {
    var parsed_url = url_call,
        temp_split_url;


    //split between base url (based ?) and separate parameters based on &
    temp_split_url = input_url.split('?');
    parsed_url.base_url = temp_split_url[0];

    params = temp_split_url[1];
    params = params.split('&');

    for (i = 0; i < params.length; i++) {
        params[i] = params[i].split('=');
        parsed_url.parameters[params[i][0]] = new Paramet(params[i][0], params[i][1], 'static');
    }

    return parsed_url;
}
console.log(parse_url('www.google.pl?parametr=123&secondparametr=abc'));

$(function () {
    $('#parse').click(function () {
        $('#parameters').empty();
        $('.not_yet').show();

        var input_field = $('#source_url').val();
        var url_call = parse_url(input_field);

        $('#base_url').empty().text(url_call.base_url);

        for (var property in url_call.parameters) {
            $('#parameters').append('<p><input type="checkbox" name="'+url_call.parameters[property].name+'">'+url_call.parameters[property].name+' = '+url_call.parameters[property].value+'</input></p>');
        }
    });
    $('#replace').click(function () {

        //get checked parameters
        var selected = [];
        $('#parameters input:checked').each(function() {
            selected.push($(this).attr('name'));
        });


        for (var i in selected){

            url_call.parameters[selected[i]].value = '<<+req_param_' + url_call.parameters[selected[i]].name + '+>>';
            url_call.parameters[selected[i]].type = 'variable';
            console.log(url_call.parameters[selected[i]])
        }

        var join_params = []
        for (var property in url_call.parameters) {
            join_params.push(url_call.parameters[property].name + '=' + url_call.parameters[property].value);


        }
        join_params = join_params.join('&');
        console.log(join_params);

        var reunion_url = '>>' + url_call.base_url + '?' + join_params + '<<';

        $('#checked').text(reunion_url);
    });

    $('#compare').click(function () {

        var source_input = $('#source_url').val(),
            mine_input = $('#mine_url').val(),
            param_pairup_match = [],
            param_source_missed = [],
            param_mine_missed = [],
            property;

        source_url = parse_url(source_input);
        mine_url = parse_url(mine_input);
        console.log(source_url, mine_url);

        // console.log('source:');
        for (property in source_url.parameters) {
            if (source_url.parameters.hasOwnProperty(property)) {
                if (mine_url.parameters[property] === undefined) {
                    $('.not_yet').show();
                    $('#parameters').append('<p><b>' + source_url.parameters[property].name + '</b> is missing</p>');
                    param_source_missed.push(source_url.parameters[property].name);
                }
                else {
                    param_pairup_match.push([source_url.parameters[property], mine_url.parameters[property]]);
                }
            }

        }
        console.log('Are missing: ');
        console.log(param_source_missed);

        //console.log('mine:');
        for (property in mine_url.parameters) {
            if (mine_url.parameters.hasOwnProperty(property)) {
                if (source_url.parameters[property] === undefined) {
                    $('.not_yet').show();
                    $('#parameters').append('<p><b>' + mine_url.parameters[property].name + '</b> is additional parameter</p>');
                    param_mine_missed.push(mine_url.parameters[property].name);
                }
                else {
                    //console.log(source_url.parameters[property].name);
                }
            }
        }

        console.log('Additional parameters:');
        console.log(param_mine_missed);


        console.log('OK:');
        console.log(param_pairup_match);

    });

});

// After two inputs are parsed to the objects properties of source_url.parameters.['param_name'] will be called on the
// mine_url.parameters.['param_name'] to get missing parameters. And the other way around mine_url in source_url to
// get additional parameters.
// Than the values of matching params will be compered char by char to find differences. Non-match will be BOLD font
function comparevalues(){
    var source_value = $('#first_input_url').val().split("");
    var your_value = $('#second_input_url').val().split("");
    var changeCount = 0;
    var testLength = 0;
    if(oldName.length > newName.length){
        testLength=oldName.length;
    }
    else testLength=newName.length;
    for(var i=0;i<testLength;i++){
        if(oldName[i]!=newName[i]) {
            changeCount++;
        }
    }
    alert(changeCount);
}
var source = ['souraceid', 'abc'];
var mine = ['abcd', 'souraceids' ];
var pair_up_match;
var pair_up = [];

$(function () {
    $('#match_params').click(function () {
        var table_params = match_params(source, mine);
        console.log(table_params);

        var $table = $('<table/>');
        for(var i in table_params){
            $table.append( '<tr><td>' + 'param: ' +  table_params[i][0] +'</td><td>' + table_params[i][1] + '</td></tr>' );
        }
        $('#display').append($table);

    });
});

function match_params(source, mine){
    for (var i in source){
        var match = 10000;
        for (var j in mine){
            var dist = levDist(source[i], mine[j]);
            if (dist <=3 && dist < match){
                match = dist;
                pair_up_match = mine[j]
            }
        }
        if (pair_up_match != undefined){
            pair_up.push([source[i], pair_up_match])
        }
    }
    return pair_up
}
// thanks to stackoverflow: answered Aug 14 '12 at 18:28 James Westgate !!
function levDist(s, t) {
    var d = []; //2d matrix

    // Step 1
    var n = s.length;
    var m = t.length;

    if (n == 0) return m;
    if (m == 0) return n;

    //Create an array of arrays in javascript (a descending loop is quicker)
    for (var i = n; i >= 0; i--) d[i] = [];

    // Step 2
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;

    // Step 3
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);

        // Step 4
        for (var j = 1; j <= m; j++) {

            //Check the jagged ld total so far
            if (i == j && d[i][j] > 4) return n;

            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1; // Step 5

            //Calculate the minimum
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;

            if (b < mi) mi = b;
            if (c < mi) mi = c;

            d[i][j] = mi; // Step 6

            //Damerau transposition
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }
    // Step 7
    return d[n][m];
}
