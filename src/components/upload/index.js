import { useState } from "react";
import { Upload, message, Input } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import "./style.css";

const { Dragger } = Upload;

const client = "https://ipfs.infura.io:5001/api/v0/add";

const Index = () => {
  const [files, setFiles] = useState([]);

  const [inputs, setInputs] = useState({
    name: "",
    passport: "",
  });

  const passportRegex = /^[0-9a-zA-Z]+$/;
  const nameRegex = /^[a-zA-Z]+$/;

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    console.log(inputs);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (inputs.name === "") {
      message.error("Name is Required");
    } else if (!inputs.name.match(nameRegex)) {
      message.error("Please Input a valid name");
    } else if (inputs.passport === "") {
      message.error("Password is Required");
    } else if (!inputs.passport.match(passportRegex)) {
      message.error("Input a valid Passport Id");
    } else if (files.length === 0) {
      message.error("You didn't upload any file");
    } else if (files.length > 1) {
      message.error("You cant submit more then one file");
    } else {
      console.log("submited succesfully");
      alert(
        `Name: ${inputs.name} passportId: ${inputs.passport} Filename: ${files[0].response.Name} HashKey: ${files[0].response.Hash}`
      );
    }
  };

  const props = {
    name: "file",
    action: client,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
        setFiles(info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div name="buysloths" className="section2-main-wrapper">
      <div className="section2-inner-wrapper">
        <form action="" onSubmit={submitHandler}>
          <Input
            placeholder="Enter Your Name"
            value={inputs.name}
            onChange={inputHandler}
            name="name"
          />
          <Input
            type="text"
            placeholder="Enter Your Passport ID"
            value={inputs.passport}
            onChange={inputHandler}
            name="passport"
          />

          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;
