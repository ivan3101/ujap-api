require('./config/db_connection');

const app = require('express')();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {PORT} = require('./config');
const routes = require('./routes');
const validationError = require('./errors/validation_error');
const handleError = require('./errors/handle_error');

app.use(helmet());
app.use(cors());
app.use(morgan('short'));
app.use(bodyParser.json());

app.get('/', (req, res) => res.status(200).json({'message': 'Welcome'}));
app.use(routes);
app.use(validationError);
app.use(handleError);

http.listen(PORT, () => console.log(`Server running in port ${PORT}`));