module.exports=[
	{
    'environment': 'production',
    'url'       : 'mongodb://localhost/howdys',
    'secret'    : 'anystringoftext'
  },

  {
    'environment': 'productio',
    'url'       : process.env.MONGOLAB_URI,
    'secret'    : 'anystringoftext'
  },

  {
    'environment': 'test',
    'url'       : 'mongodb://dessHub:test1ng@ds119578.mlab.com:19578/howdys',
    'secret'    : 'anystringoftext'
  }
]
