const config = require('./config');

const protocolDomainAndPort = (protocol, domain, port) => `${protocol}://${domain}` + (port ? `:${port}` : '');

// replaces :<pathFragment> with URL params; creates query string based on queryParams (passed as key-value pairs)
const path = (path, queryParams) => {
  throw new Error('Not yet implemented');
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