import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTable,
  MDBView,
  MDBCollapse,
  MDBCollapseHeader,
  MDBBtnGroup,
} from "mdbreact";
import { useDispatch, useSelector } from "react-redux";
import { fullName } from "../../../../services/utilities";
import {
  BROWSE,
  RESET,
} from "../../../../services/redux/slices/resources/sections";
import Modal from "./modal";
import Create from "./create";

export default function Sections() {
  const [sections, setSections] = useState([]),
    [activeId, setActiveId] = useState(-1),
    [show, setShow] = useState(false),
    [showCreate, setShowCreate] = useState(false),
    [willCreate, setWillCreate] = useState(false),
    { token, credentials } = useSelector(({ auth }) => auth),
    { collections } = useSelector(({ sections }) => sections),
    dispatch = useDispatch();

  useEffect(() => {
    if (token)
      dispatch(BROWSE({ token, key: { schools: credentials?.schools } }));

    return () => dispatch(RESET());
  }, [dispatch, token]);

  useEffect(() => {
    collections && setSections(collections);
  }, [collections]);

  // Group data by course and level
  const groupedData = sections?.reduce((acc, item) => {
    const key = `${item.course}-${item.level}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  const toggle = async () => {
    setShow(!show);
  };

  const toggleCreate = () => {
    setShowCreate(!showCreate);
    setWillCreate(true);
  };

  return (
    <>
      <MDBCard narrow>
        <MDBView
          cascade
          className="gradient-card-header blue-gradient py-2 mx-4 d-flex justify-content-between align-items-center"
        >
          <span className="ml-3">Year Levels</span>

          <form
            //   onSubmit={handleSearch}
            id="faculty-inline-search"
            className="form-inline ml-2"
          >
            <div className="form-group md-form py-0 mt-0">
              <input
                className="form-control w-80 placeholder-white text-white"
                type="text"
                placeholder="School Search..."
                name="searchKey"
                required
              />
              <MDBBtn
                //   onClick={() => {
                //     if (!searchKey) return;
                //     setSearchKey("");
                //     document.getElementById("faculty-inline-search").reset();
                //   }}
                type="submit"
                size="sm"
                color="info"
                className="d-inline ml-2 px-2"
              >
                <MDBIcon icon="search" />
              </MDBBtn>
              <MDBBtn
                onClick={() => toggleCreate(true)}
                type="button"
                size="sm"
                color="success"
                className="d-inline ml-2 px-2"
              >
                <MDBIcon icon="plus" />
              </MDBBtn>
            </div>
          </form>
        </MDBView>
        <MDBCardBody>
          {Object.entries(groupedData).map(([groupKey, groupItems], index) => (
            <div key={groupKey}>
              <MDBCollapseHeader
                onClick={() => {
                  setActiveId((prev) => (prev === index ? -1 : index));
                }}
              >
                <div className="d-flex justify-content-between">
                  {/* Your header content, e.g., display course and level */}
                  <label>{`Course: ${groupItems[0].course}, Level: ${groupItems[0].level}`}</label>
                  <i
                    style={{ rotate: `${activeId === index ? 0 : 90}deg` }}
                    className="fa fa-angle-down transition-all"
                  />
                </div>
              </MDBCollapseHeader>

              <MDBCollapse id={`collapse-${index}`} isOpen={index === activeId}>
                <MDBTable responsive hover>
                  <thead>
                    <tr>
                      <th className="th-lg cursor-pointer">#&nbsp;</th>
                      <th className="th-lg">Section</th>
                      <th className="th-lg">Adviser</th>
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {!groupItems?.length && (
                      <tr>
                        <td className="text-center" colSpan="5">
                          No recent records.
                        </td>
                      </tr>
                    )}
                    {groupItems?.map((section, index) => {
                      const { name, _id, adviser } = section;

                      return (
                        <tr key={_id}>
                          <td>{index + 1}</td>
                          <td>{name}</td>
                          <td className="text-uppercase">
                            {fullName(adviser.fullName)}
                          </td>

                          <td className="py-2 text-center">
                            <MDBBtnGroup>
                              <MDBBtn
                                title="Tag "
                                color="primary"
                                size="sm"
                                rounded
                                onClick={() => toggle()}
                              >
                                <MDBIcon icon="tag" />
                              </MDBBtn>
                              <MDBBtn
                                title="Disable Account"
                                color="danger"
                                size="sm"
                                rounded
                                //   onClick={() => setShowDisable(true)}
                              >
                                <MDBIcon icon="user-slash" />
                              </MDBBtn>
                            </MDBBtnGroup>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </MDBTable>
              </MDBCollapse>
            </div>
          ))}
        </MDBCardBody>
      </MDBCard>
      <Modal toggle={toggle} setShow={setShow} show={show} />
      <Create toggle={toggleCreate} show={showCreate} willCreate={willCreate} />
    </>
  );
}
