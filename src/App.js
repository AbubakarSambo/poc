import React, { useState } from 'react';
import axios from 'axios'
import FileBase64 from 'react-file-base64';
import logo from './logo.svg';
import './App.css';

function App() {
  const [files, setFiles] = useState({})
  const [file2, setFiles2] = useState({})
  const [raw1, setRaw1] = useState('')
  const [raw2, setRaw2] = useState('')
  const [valid, setValid] = useState(null)
  const [loading, setLoading] = useState(false)



  const getFiles = (files) => {
    setRaw1(files[0].base64)
    setFiles({ fileName: files[0].name, fileType: files[0].type.split('/')[1], photo: files[0].base64.split(',')[1] })
  }
  const getFiles2 = (files) => {
    setRaw2(files[0].base64)
    setFiles2({ fileName: files[0].name, fileType: files[0].type.split('/')[1], photo: files[0].base64.split(',')[1] })


  }
  const submit = () => {
    let data = [files, file2]
    setLoading(true)
    setValid(null)
    axios.post('http://ca38fe5442dc.ngrok.io/face-compare', data)
      .then((response) => {
        setLoading(false)
        setValid(response.data.isValid)

      })
  }
  return (
    <div className="App">
      <div>
        <FileBase64
          multiple={true}
          onDone={(files) => getFiles(files)} />
        <FileBase64
          multiple={true}
          onDone={(files) => getFiles2(files)} />

        <button onClick={submit} >Submit</button>
      </div>


      <div className="images">
        {raw1 && <img src={`${raw1}`} width={100} />}
        {raw2 && <img src={`${raw2}`} width={100} />}
      </div>
      {!loading && <div className={`result ${valid ? 'green' : 'red'}`}>
        {valid === null ? '' : valid ? 'Match' : 'No Match'}
      </div>}

    </div>
  );
}

export default App;
