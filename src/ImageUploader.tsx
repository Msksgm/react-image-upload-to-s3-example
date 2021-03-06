import { FC } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import Thumb from "./Thumb";
import uploadFile from "./upload-image";

const ImageUploader: FC = () => {
  return (
    <Formik
      initialValues={{ file: null }}
      onSubmit={(values: any) => {
        alert(
          JSON.stringify({
            fileName: values.file.name,
            type: values.file.type,
            size: `${values.file.size} bytes`,
          })
        );
        uploadFile(values.file);
      }}
      validationSchema={yup.object().shape({
        file: yup.mixed().required(),
      })}
    >
      {({ setFieldValue, values }) => {
        return (
          <Form>
            <div className="form-group">
              <label htmlFor="file">File upload</label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={(event) => {
                  setFieldValue(
                    "file",
                    event.currentTarget.files !== null
                      ? event.currentTarget.files[0]
                      : null
                  );
                }}
                className="form-control"
              />
              <Thumb file={values.file} />
            </div>
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ImageUploader;
