import React, {useState} from 'react';

export function FileUpload() {

    const [selectedFile, setSelectedFile] = useState();
    const[isSelected, setIsSelected]= useState(false)
    // const [isFilePicked, setIsFilePicked] = useState(false);

    const handleChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsSelected(true);
    };

    const handleSubmit = () => {
        if(isSelected=== true){
            alert("File uploded");
        } else{
            alert("upload a file");
        }
    };

    return(
        <form>
            <h2>Upload a file</h2>
            <input type="file" name="file" onChange={handleChange} />

            <div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </form>
    )
}