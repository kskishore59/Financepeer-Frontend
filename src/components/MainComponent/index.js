import {useState} from 'react'
import ReactFileReader from 'react-file-reader';
import Cookies from 'js-cookie';
import DisplayTable from '../Table'


const Home = () => {
    const [show, setShow] = useState(false)
    const [view, setView] = useState(false)
    const [file, setFile] = useState([]);
    const [data, setData] = useState()

  const  handleFiles = async (files) => {
    const reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = function(e) {
        const data = e.target.result
        console.log(data)
        setData(data)
        setShow(true)
    }
    const url ='https://finanbackend.herokuapp.com/add/'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
        method: 'POST',
        headers : {
            Authorization: `Bearer ${jwtToken}` 
        },
        body: data
    }
    const response = await fetch(url, options)
    console.log(response.json())
    
}

const onClickView = async () => {
    const url ='https://finanbackend.herokuapp.com/data'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
        method: 'GET',
        headers : {
            Authorization: `Bearer ${jwtToken}` 
        }
        
    }
    const response = await fetch(url, options)
    console.log(response.json())
    setView(true)   
}


    return (
        <div>
            <ReactFileReader fileTypes={[ "JSON File"]} handleFiles={handleFiles}>
                <button className='btn'>Upload</button>
            </ReactFileReader>
            {show ? (<h1>File Uploaded Successfully</h1>) : ''}
            {show ? (<button type='button' onClick={onClickView}>View Data</button>) : '' }
            <div>
                {view ? (<DisplayTable tableData = {file} />) : ''}
            </div>
        </div>
    )
}

export default Home