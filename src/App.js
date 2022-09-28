// Let’s create our form to accept files from users

import React from 'react';
import { useState } from 'react';
import FormData from 'form-data';
import axios from 'axios';

function App() {

  const [file, setFile] = useState()
  const [myipfsHash, setIPFSHASH] = useState('')

  const handleFile = async (fileToHandle) => {
    const formData= new FormData()
    formData.append(
      "file",
      fileToHandle
    )

    const API_KEY= process.env.public_API_KEY;
    const API_SECRET =process.env.private_API_KEY;

    const url =`https://api.pinata.cloud/pinning/pinFileToIPFS`

    const response= await axios.post(
      url,
      formData,
      {
        maxContentLength:"Infinity",
        headers: {
          "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 
          'pinata_api_key': API_KEY,
          'pinata_secret_api_key': API_SECRET

      }
      }
    )
    // console.log(response)
    return response;

    // setIPFSHASH(response.data.IpfsHash)

  }
  return (
    <div className ="App">
      <input type="file" onChange={(event) => setFile(event.target[0])} />
      <button onClick={() => handleFile(file)}>Pin file</button>
      
{myipfsHash.length > 0 && <img height='200' src={`https://gateway.pinata.cloud/ipfs/${myipfsHash}`} alt='not loading'/>}
    </div>
  )
}

export default App
