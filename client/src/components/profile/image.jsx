import React from "react";
import { MDBIcon } from "mdbreact";
// import { useDispatch, useSelector } from "react-redux";
// import { PresetImage } from "../../services/utilities";
// import { useToasts } from "react-toast-notifications";
import "./profile.css";

export default function ProfileImage() {
  // const [file, setFile] = useState(null),
  //   { auth, progressBar, image } = useSelector(({ auth }) => auth),
  //   dispatch = useDispatch(),
  //   { addToast } = useToasts();

  // useEffect(() => {
  //   if (file && progressBar === 100) {
  // dispatch(IMAGE(URL.createObjectURL(file)));
  //     setFile(null);
  //     addToast("Image Updated Successfully.", {
  //       appearance: "success",
  //     });
  //   }
  // }, [progressBar, file, dispatch, addToast]);

  // const handleError = (message) =>
  //   addToast(message, {
  //     appearance: "warning",
  //   });

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];

  //   if (file.type !== "image/jpeg" || file.type !== "image/jpg")
  //     return handleError("Please select a JPG image.");

  //   const reader = new FileReader();

  //   reader.onload = (e) => {
  //     const img = new Image();
  //     img.src = e.target.result;

  //     img.onload = function () {
  //       if (this.width !== this.height)
  //         return handleError("Image must be square.");

  //       if (this.width > 100)
  //         return handleError("Image too big, maximum size is 100 pixels.");

  //       setFile(file);
  //       dispatch();
  // UPLOAD({
  //   data: {
  //     path: `${auth.email}`,
  //     base64: reader.result.split(",")[1],
  //     name: "profile.jpg",
  //   },
  //   token,
  // })
  //     };
  //   };

  //   reader.readAsDataURL(file);
  // };

  return (
    <>
      <div className="profile-container">
        <img
          src="https://scontent.fcrk2-2.fna.fbcdn.net/v/t1.18169-9/13177391_952786094834165_1174862213095433470_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=7a1959&_nc_eui2=AeE7DE7_uzpgvXpdJKXZzWNugaoQP3N0HdCBqhA_c3Qd0HSialDzbhbbR6GQQ0Sw8pRV7YmK8ldIAVFwZO2LbmKQ&_nc_ohc=0YSkcYwP0IEAX-0p8RD&_nc_ht=scontent.fcrk2-2.fna&oh=00_AfBpxx8uCEh3xMqNji3oc500uvUXmPxfYV1suaFJ57FPyg&oe=65A8A2F4"
          className="school-profile"
          alt="profile"
        />
        <label className="profile-camera">
          <MDBIcon icon="camera" />
        </label>
      </div>
    </>
  );
}
