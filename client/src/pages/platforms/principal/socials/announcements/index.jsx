import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BROWSE,
  DESTROY,
  RESET,
  TOGGLEMODAL,
} from "../../../../../services/redux/slices/announcements";
import DataTable from "../../../../../components/dataTable";
import { fullName, globalSearch } from "../../../../../services/utilities";
import Modal from "./modal";
import { useToasts } from "react-toast-notifications";
import { MDBBadge } from "mdbreact";
import ModalPreview from "./preview";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]),
    [modal, setModal] = useState(false),
    [selected, setSelected] = useState({}),
    [willCreate, setWillCreate] = useState(true),
    { token, auth } = useSelector(({ auth }) => auth),
    { collections, isLoading, isSuccess, message } = useSelector(
      ({ announcements }) => announcements
    ),
    { addToast } = useToasts(),
    dispatch = useDispatch();

  useEffect(() => {
    if (token && auth._id)
      dispatch(
        BROWSE({
          token,
          // key: {
          //   createdBy: auth._id,
          // },
        })
      );

    return () => dispatch(RESET());
  }, [dispatch, token, auth]);

  useEffect(() => {
    setAnnouncements(collections);
  }, [collections]);

  useEffect(() => {
    if (message) {
      addToast(message, {
        appearance: isSuccess ? "success" : "error",
      });
    }
  }, [isSuccess, message, addToast]);

  const handleSearch = async (willSearch, key) => {
    if (willSearch) return setAnnouncements(globalSearch(collections, key));

    setAnnouncements(collections);
  };

  const handleCreate = () => {
    if (!willCreate) setWillCreate(true);

    dispatch(TOGGLEMODAL());
  };

  const handleUpdate = (selected) => {
    if (willCreate) setWillCreate(false);

    setSelected(selected);
    dispatch(TOGGLEMODAL());
  };

  const handleDelete = (selected) => {
    dispatch(
      DESTROY({
        token,
        data: selected,
      })
    );
  };

  const handlePreview = (selected) => {
    setModal(true);
  };

  return (
    <>
      <DataTable
        title="Annoumcements"
        actions={[
          {
            _icon: "plus",
            _title: "Add announcement",
            _function: handleCreate,
            _disabledOnSearch: true,
          },
          {
            _icon: "eye",
            _title: "Preview",
            _function: handlePreview,
            // _shouldReset: true,
            // _haveSelect: true,
            // _allowMultiple: false,
          },
          {
            _icon: "pen",
            _title: "Update announcement",
            _function: handleUpdate,
            _shouldReset: true,
            _haveSelect: true,
            _allowMultiple: false,
          },
          {
            _icon: "trash",
            _title: "Delete announcement",
            _function: handleDelete,
            _shouldReset: true,
            _haveSelect: true,
            _allowMultiple: true,
          },
        ]}
        tableHeads={[
          {
            _text: "Title",
          },
          {
            _text: "Date start",
          },
          {
            _text: "Date end",
          },
          {
            _text: "Created By",
          },
        ]}
        tableBodies={[
          {
            _key: "title",
            _format: (title, { isPublished }) => {
              return (
                <>
                  <div>{title}</div>
                  <MDBBadge color={isPublished ? "success" : "info"}>
                    {isPublished ? "PUBLISHED" : "DRAFT"}
                  </MDBBadge>
                </>
              );
            },
          },
          {
            _key: "start",
          },
          {
            _key: "end",
          },
          {
            _key: "createdBy",
            _format: (data) => {
              return fullName(data.fullName);
            },
          },
        ]}
        handleSearch={handleSearch}
        isLoading={isLoading}
        array={announcements}
      />
      <Modal
        willCreate={willCreate}
        selected={{
          _id: selected?._id,
          location: selected?.location,
          title: selected?.title,
          isPublished: selected?.isPublished,
          isPrivate: selected?.isPrivate,
          start: new Date(selected?.start),
          end: new Date(selected?.end),
          priority: selected?.priority,
          files: selected?.files,
          text: selected?.text,
        }}
      />
      <ModalPreview show={modal} toggle={() => setModal(false)} />
    </>
  );
}
