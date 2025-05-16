import app from './src/app';
const PORT = process.env.PORT || 5010;

app.listen(PORT, () => {
  console.log('Server runing in port', PORT);
});
