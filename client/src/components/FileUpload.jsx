import { useState } from 'react';
import axios from 'axios';
import { Message, Progress } from './';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    setTimeout(() => setMessage(''), 5000);

    try {
      const res = await axios.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        },
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded.');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server.');
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  return (
    <>
      {message && <Message msg={message} />}
      <form onSubmit={onSubmit}>
        <div className="custom-file mt-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <Progress percentage={uploadPercentage} />
          <label className="custom-file-label" htmlFor="customFile">
            {fileName}
          </label>
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        </div>
      </form>
      {uploadedFile && (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              src={uploadedFile.filePath}
              alt={uploadedFile.fileName}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FileUpload;
