const { getMessage } = require('../helpers/messages');

const TYPE_JSON = 'application/json';
const STATUS_CODE_OK = 200;
const STATUS_CODE_BAD_REQUEST = 400;
const STATUS_CODE_UNAUTHORIZED = 401;
const STATUS_CODE_NOT_FOUND = 404;
const STATUS_CODE_SERVER_ERROR = 500;

const jsonOK = function(data, message, metadata) {
    const status = STATUS_CODE_OK;

    // data = (data) ? data : null
    message = (message) ? message : getMessage('response.json_Ok');
    metadata = (metadata) ? metadata : {};

    this.status(STATUS_CODE_OK);
    this.type(TYPE_JSON);
    return this.json({ message, data, metadata, status: status });
};

const jsonBadRequest = function(data, message, metadata) {
    const status = STATUS_CODE_BAD_REQUEST;

    // data = (data) ? data : null
    message = (message) ? message : getMessage('response.json_Bad_Request');
    metadata = (metadata) ? metadata : {};

    this.status(STATUS_CODE_BAD_REQUEST);
    this.type(TYPE_JSON);
    return this.json({ message, data, metadata, status: status });
};

const jsonUnauthorized = function(data, message, metadata) {
    const status = STATUS_CODE_UNAUTHORIZED;

    // data = (data) ? data : null
    message = (message) ? message : getMessage('response.json_Unauthorized');
    metadata = (metadata) ? metadata : {};

    this.status(STATUS_CODE_UNAUTHORIZED);
    this.type(TYPE_JSON);
    return this.json({ message, data, metadata, status: status });
};

const jsonNotFound = function(data, message, metadata) {
    const status = STATUS_CODE_NOT_FOUND;

    // data = (data) ? data : null
    message = (message) ? message : getMessage('response.json_Not_Found');
    metadata = (metadata) ? metadata : {};

    this.status(STATUS_CODE_NOT_FOUND);
    this.type(TYPE_JSON);
    return this.json({ message, data, metadata, status: status });
};

const jsonServerError = function(data, message, metadata) {
    const status = STATUS_CODE_SERVER_ERROR;

    // data = (data) ? data : null
    message = (message) ? message : getMessage('response.json_Server_Error');
    metadata = (metadata) ? metadata : {};

    this.status(STATUS_CODE_SERVER_ERROR);
    this.type(TYPE_JSON);
    return this.json({ message, data, metadata, status: status });
};

const response = (req, res, next) => {

    res.jsonOK = jsonOK; 
    res.jsonBadRequest = jsonBadRequest;
    res.jsonUnauthorized = jsonUnauthorized;
    res.jsonNotFound = jsonNotFound;
    res.jsonServerError = jsonServerError;

    next();
};

module.exports = response;