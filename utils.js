const querystring = require('querystring');

const config = require('./config');

const protocolDomainAndPort = (protocol, domain, port) => `${protocol}://${domain}` + (port ? `:${port}` : '');

// replaces :<pathFragment> with URL params; creates query string based on queryParams (passed as key-value pairs)
// path: must begin with "/"; may have params that take the form ":paramName". The path is assumed to be well-formed
const path = (path, queryParams = {}) => {
  if (!path) {
    throw new Error('No path provided.');
  }

  let newPath = path;
  let queryStringValues = {};
  for (let key of Object.keys(queryParams)) {
    const value = queryParams[key];
    const param = `:${key}`;
    if (newPath.indexOf(param) > 0) {
      newPath = newPath.replace(param, value);
    } else {
      queryStringValues[key] = value;
    }
  }
  if (newPath.indexOf(':') >= 0) {
    throw new Error('Values missing for path params');
  }
  let queryString = querystring.stringify(queryStringValues);
  if (queryString) {
    newPath += '?' + queryString;
  }
  return newPath;
};

const url = (protocol, service, path = '') => {
  const serviceConfig = config[service];
  if (!serviceConfig) {
    throw new Error(`Config not found for service ${service}`);
  }
  const { domain, port } = serviceConfig;
  return protocolDomainAndPort(protocol, domain, port) + path;
};

module.exports = {
  protocolDomainAndPort,
  path,
  url
}
