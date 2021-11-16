import React, { useState } from "react";
import axios from "axios";
import { baseUri } from "../utils/constant";

const upload = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectFile, setSelectFile] = useState<any>();

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;

    if (!fileList) return;

    setSelectFile(fileList[0]);
  };

  const handleUpload = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", selectFile, selectFile.name);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
      withCredentials: true,
    };

    axios
      .post(
        `http://localhost:5000/api/sipher/v1.1/post/upload`,
        formData,
        config
      )
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h4>Node.js upload files - trungquandev</h4>
      <div className=""></div>
      <form method="POST" encType="multipart/form-data">
        <div className="form-group">
          <label htmlFor="example-input-file">&nbsp;</label>
          <input
            type="file"
            name="file"
            className="form-control-file border"
            onChange={onChangeHandler}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleUpload}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default upload;
<form action="" method="post"></form>;
