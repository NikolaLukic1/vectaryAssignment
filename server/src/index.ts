import app  from './app';
import env from '../envConfig';

const PORT = env.PORT || 3000;

app.listen(PORT, () => {
    console.info('Express server listening on http://localhost:' + PORT);
});