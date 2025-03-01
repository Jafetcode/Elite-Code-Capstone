// api.cache(false)
module.exports = {
    presents: ['module:metro-react-native-babel-present'],
    plugins: [
        [
            'module:react-native-dotenv',
            {
                envName: 'APP_ENV',
                moduleName: '@env',
                path: '.env'
                
            },
        ],
    ],
};
