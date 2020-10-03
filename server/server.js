const app = require('./app');
const config = require('./config');
const dbConnect = require('./models');
const { PORT } = config;

dbConnect();

app.set('port', PORT || 7000);

app.listen(app.get('port'), () => {
    console.log(`Server listening at port: ${app.get('port')}`);
})