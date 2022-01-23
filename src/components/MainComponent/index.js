import {useState} from 'react'
import ReactFileReader from 'react-file-reader';
import Cookies from 'js-cookie';
import DisplayTable from '../Table';
import './index.css'


const Home = (props) => {
    const [show, setShow] = useState(false)
    const [view, setView] = useState(false)
    const [data, setData] = useState([]);

  const  handleFiles = async (files) => {
    const reader = new FileReader();
    reader.readAsText(files[0]);
    reader.onload = async function(e) {
        const result = e.target.result
        setShow(true)
        const url ='https://finanbackend.herokuapp.com/add/'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
        method: 'POST',
        headers : {
            Authorization: `Bearer ${jwtToken}`,
             "Content-Type": "application/json",
                accept: "application/json"
        },
        body: result
    }
    const response = await fetch(url, options)
    const res = await response.json()
    console.log(res)

    }
    
    
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
    const newData = await response.json()
    setData(newData)
    setView(true)
}

const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }


    return (
        <div>
            <nav className="nav-bar">
          <img
            src="https://res.cloudinary.com/dqnh9af86/image/upload/v1637753181/financepeer_ivbgcj.png"
            alt="logo"
          />
          <button type="button" onClick={onClickLogout}>
            Logout
          </button>
        </nav>
        
        <div className='success-container'>
            <ReactFileReader fileTypes={[ "JSON File"]} handleFiles={handleFiles}>
                <div className='button-container'>
                    Upload your file here
                    <button className='btn upload-button'>Upload</button>
                </div>
            </ReactFileReader>
            <div className='success-container'>
                {show ? (<h1>File Uploaded Successfully</h1>) : ''}
                {show ? (<button type='button' className='view-button' onClick={onClickView}>View Data</button>) : '' }
            </div>
            <div>
                {view ? (<DisplayTable tableData = {data} />) : ''}
            </div>
        </div>
        </div>
    )
}

export default Home