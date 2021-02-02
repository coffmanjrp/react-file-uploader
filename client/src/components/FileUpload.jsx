const FileUpload = () => {
  return (
    <>
      <form>
        <div className="custom-file mt-4">
          <input type="file" className="custom-file-input" id="customFile" />
          <label className="custom-file-label" htmlFor="customFile">
            Choose file
          </label>
          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        </div>
      </form>
    </>
  );
};

export default FileUpload;
