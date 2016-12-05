module.exports=[
	{
    'environment': 'development',
    'url'       : 'mongodb://localhost/howdys',
    'secret'    : 'anystringoftext'
  },

  {
    'environment': 'production',
    'url'       : process.env.MONGOLAB_URI,
    'secret'    : 'anystringoftext'
  },

  {
    'environment': 'test',
    'url'       : 'mongodb://localhost/howdys',
    'secret'    : 'anystringoftext'
  }
]
