import React, { useRef, useState } from 'react';
import * as XLSX from "xlsx";
import DataProcessor from './DataProcessor';
import '../styles/styles.css';

const FileSpecInput = () => {
    const [selectedFile, setSelectedFile] = useState(null); 

    const [specLimit, setSpecLimit] = useState('');
    const [steps, setSteps] = useState('');

    const handleFileInput = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: '',
        });

        setSelectedFile(jsonData);
    }

    const handleInput = (input) => {
        if(input.target.name == "specLimit"){
            setSpecLimit(input.target.value);
        } else if(input.target.name == 'steps') {
            setSteps(input.target.value);
        }
    }

    return(
        <div className='inputForm'>
            <input type="file" onChange={(e)=>{ handleFileInput(e) }}/>
            <label htmlFor="specLimit">Specification Limit:</label>
            <input id='specLimit' name='specLimit' type='number' onChange={handleInput}/>
            <label htmlFor="steps">Steps:</label>
            <input id='steps' name='steps' type='number' onChange={handleInput}/>
            
            <DataProcessor file={selectedFile} specLimit={specLimit} steps={steps}/>
        </div>
    );
}

export default FileSpecInput;