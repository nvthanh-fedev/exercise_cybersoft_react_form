//rafce
import React from "react";

import {
  Container,
  FormGroup,
  Input,
  Table,
  Button,
  InputGroup,
  InputGroupText,
  FormFeedback,
  Row,
  Col,
  Form,
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faIdCardClip,
  faFileSignature,
  faPhone,
  faEnvelope,
  faUser,
  faBroom,
} from "@fortawesome/free-solid-svg-icons";

//hook react-redux
import { useDispatch, useSelector } from "react-redux";
import {
  saveStudentAction,
  updateStudentInput,
  deleteStudentAction,
  updateStudentAction,
  updateSearchInput,
  claerFormAction,
} from "../../../redux/reducers/formReduxReducer";

const FormRedux = () => {
  const { arrStudents, studentInput, errMessage, isValid, searchInput } =
    useSelector((state) => state.formReduxReducer);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); //chặn sự kiện reload trang
    // console.log(userComment.current);
    //Đưa dữ liệu form lên redux
    const action = saveStudentAction(studentInput);
    //Gửi dữ liệu lên reducer
    dispatch(action);
  };

  const handleChangeSearch = (e) => {
    const { id, value } = e.target;
    //Đưa dữ liệu id và value lên redux
    const action = updateSearchInput({ id, value });
    //Gửi object có id và value lên redux
    dispatch(action);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    //Đưa dữ liệu id và value lên redux
    const action = updateStudentInput({ id, value });
    //Gửi object có id và value lên redux
    dispatch(action);
  };

  const findStudent = (inputSearch) => {
    const searchTerm = stringToSlug(inputSearch).toLowerCase();
    const foundStudents = arrStudents.filter((student) => {
      const { id, name, phone, email } = student;
      const slugId = stringToSlug(id).toLowerCase();
      const slugName = stringToSlug(name).toLowerCase();
      const slugPhone = stringToSlug(phone);
      const slugEmail = stringToSlug(email).toLowerCase();

      return (
        slugId.includes(searchTerm) ||
        slugName.includes(searchTerm) ||
        slugPhone.includes(searchTerm) ||
        slugEmail.includes(searchTerm)
      );
    });

    console.log("foundStudents in findStudent method", foundStudents);
    return foundStudents;
  };

  const stringToSlug = (title) => {
    let slug = title.toLowerCase();

    const diacriticMap = {
      á: "a",
      à: "a",
      ả: "a",
      ạ: "a",
      ã: "a",
      ă: "a",
      ắ: "a",
      ằ: "a",
      ẳ: "a",
      ẵ: "a",
      ặ: "a",
      â: "a",
      ấ: "a",
      ầ: "a",
      ẩ: "a",
      ẫ: "a",
      ậ: "a",
      é: "e",
      è: "e",
      ẻ: "e",
      ẽ: "e",
      ẹ: "e",
      ê: "e",
      ế: "e",
      ề: "e",
      ể: "e",
      ễ: "e",
      ệ: "e",
      í: "i",
      ì: "i",
      ỉ: "i",
      ĩ: "i",
      ị: "i",
      ó: "o",
      ò: "o",
      ỏ: "o",
      õ: "o",
      ọ: "o",
      ô: "o",
      ố: "o",
      ồ: "o",
      ổ: "o",
      ỗ: "o",
      ộ: "o",
      ơ: "o",
      ớ: "o",
      ờ: "o",
      ở: "o",
      ỡ: "o",
      ợ: "o",
      ú: "u",
      ù: "u",
      ủ: "u",
      ũ: "u",
      ụ: "u",
      ư: "u",
      ứ: "u",
      ừ: "u",
      ử: "u",
      ữ: "u",
      ự: "u",
      ý: "y",
      ỳ: "y",
      ỷ: "y",
      ỹ: "y",
      ỵ: "y",
      đ: "d",
    };

    slug = slug.replace(/[^\w\s-]/g, "");
    slug = slug.replace(/\s+/g, "-");
    slug = slug.replace(/-{2,}/g, "-");
    slug = slug.replace(/[^a-z0-9-]/g, (match) => diacriticMap[match] || "");

    slug = slug.replace(/^-+|-+$/g, "");

    return slug;
  };

  const renderTableByArrStudent = (arr) => {
    arr.map((student, index) => {
      console.log(student);

      return (
        <tr key={index}>
          <th scope="row">{student.id}</th>
          <td>{student.name}</td>
          <td>{student.phone}</td>
          <td>{student.email}</td>
          <td>
            <Button
              color="warning"
              onClick={() => {
                const action = updateStudentAction(student.id);
                dispatch(action);
              }}
            >
              <FontAwesomeIcon icon={faPen} />
              <p className="d-inline" style={{ marginLeft: "5px" }}>
                Update
              </p>
            </Button>
            <Button
              style={{ marginLeft: "1rem" }}
              color="danger"
              onClick={() => {
                const action = deleteStudentAction(student.id);
                dispatch(action);
              }}
            >
              <FontAwesomeIcon icon={faTrash} />
              <p className="d-inline" style={{ marginLeft: "5px" }}>
                Delete
              </p>
            </Button>
          </td>
        </tr>
      );
    });
  };

  const renderTbody = (arr, inputSearch) => {
    const foundStudents = findStudent(inputSearch);

    if (inputSearch.trim() === "" || foundStudents.length === 0) {
      console.log("Render arr students default");
      renderTableByArrStudent(arrStudents);
    } else {
      console.log("Render arr students founded");

      renderTableByArrStudent(foundStudents);
    }
    console.log(
      "🚀 ~ file: FormRedux.jsx:134 ~ renderTbody ~ foundStudents:",
      foundStudents
    );
    console.log("🚀 ~ file: FormRedux.jsx:139 ~ renderTbody ~ arr:", arr);
  };

  return (
    <Container>
      <br />
      <br />
      <h1 className="d-inline">Student Management</h1>
      <br />
      <br />

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <InputGroup>
            <InputGroupText>
              <FontAwesomeIcon icon={faIdCardClip} />
            </InputGroupText>
            <Input
              id="id"
              onInput={handleChange}
              placeholder="Enter your ID"
              value={studentInput.id}
              invalid={!isValid.id}
            />
            <FormFeedback>{errMessage.id}</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupText>
              <FontAwesomeIcon icon={faFileSignature} />
            </InputGroupText>
            <Input
              id="name"
              onInput={handleChange}
              placeholder="Enter your name"
              value={studentInput.name}
              invalid={!isValid.name}
            />
            <FormFeedback>{errMessage.name}</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupText>
              <FontAwesomeIcon icon={faPhone} />
            </InputGroupText>
            <Input
              id="phone"
              onInput={handleChange}
              placeholder="Enter your phone"
              value={studentInput.phone}
              invalid={!isValid.phone}
            />
            <FormFeedback>{errMessage.phone}</FormFeedback>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroupText>
              <FontAwesomeIcon icon={faEnvelope} />
            </InputGroupText>
            <Input
              id="email"
              onInput={handleChange}
              placeholder="Enter your email"
              value={studentInput.email}
              invalid={!isValid.email}
            />
            <FormFeedback>{errMessage.email}</FormFeedback>
          </InputGroup>
        </FormGroup>

        <Row>
          <Col xs="12">
            <Button
              color="success"
              style={{ marginBottom: "1rem" }}
              type="submit"
            >
              <FontAwesomeIcon icon={faUser} />{" "}
              <p className="d-inline" style={{ marginLeft: "5px" }}>
                Save student
              </p>
            </Button>

            <Button
              color="primary"
              style={{ marginBottom: "1rem", marginLeft: "1rem" }}
              onClick={() => {
                const action = claerFormAction();
                dispatch(action);
              }}
            >
              <FontAwesomeIcon icon={faBroom} />
              <p className="d-inline" style={{ marginLeft: "5px" }}>
                Clear data
              </p>
            </Button>
          </Col>
        </Row>
      </Form>
      <br />
      <br />

      <Row>
        <Col xs="6">
          <h3>Table Student</h3>
        </Col>
        <Col xs="6">
          <FormGroup>
            <Input
              id="exampleSearch"
              name="search"
              placeholder="Search student"
              type="search"
              height={"200px"}
              onInput={handleChangeSearch}
            />
          </FormGroup>
        </Col>
      </Row>
      <br />

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>{renderTbody(arrStudents, searchInput)}</tbody>
      </Table>
      <br />
    </Container>
  );
};

export default FormRedux;
