// Assuming you're using Node.js version 14 or later that supports ES Modules
import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';

let form = new FormData();
form.append('imageA', fs.createReadStream('./img2.jpg'));
form.append('imageB', fs.createReadStream('./img2.jpg'));

axios({
  method: 'post',
  url: 'http://localhost:5000/compare',
  data: form,
  headers: form.getHeaders()
})
.then((response) => {
  console.log(response.data);
})
.catch((error) => {
  console.error(error);
});
