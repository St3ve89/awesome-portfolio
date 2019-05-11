const prod = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.BASE_URL': prod ? 'https://istvanacs.herokuapp.com' : 'http://localhost:3000',
  'process.env.NAMESPACE': 'https://istvanacs.herokuapp.com',
  'process.env.CLIENT_ID': 'nwDpGURZPVEb70PsoPcu4VIjP6DzQrNr'
}