module.exports=[
	{
    'environment': 'development',
    'url'       : 'mongodb://localhost/howdys',
    'secret'    : 'anystringoftext'
  },

  {
    'environment': 'production',
    'url'       : 'mongodb://mongodb://dessHub:1ncorrect.@ds119578.mlab.com:19578/howdys',
    'secret'    : 'anystringoftext'
  },

  {
    'environment': 'test',
    'url'       : 'mongodb://localhost/howdys',
    'secret'    : 'anystringoftext'
  }
]
