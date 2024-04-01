import { AuthContext } from "@/context/AuthContext";
import {
  db,
  // storage
} from "@/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useContext, useRef, useState } from "react";

const accountTypes = ["Freelancer", "Buyer"];

export default function SetupAccount() {
  const { user, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [file, setFile] = useState<any>(null);
  const fileInputRef = useRef<any>(null);

  const [accountType, setAccountType] = useState<any>(accountTypes[0]);

  const finishProfileSetup = async () => {
    let imageUrl;

    // todo: Upload image if image
    // if (file) {
    //   const fileRef = `profilePictures/${user.uid}/${file.name}`;

    //   const storageRef = ref(storage, fileRef);
    //   await uploadBytes(storageRef, file).then((snapshot) => {
    //     console.log("Uploaded a blob or file!");
    //   });

    //   imageUrl = await getDownloadURL(ref(storage, fileRef));
    // }

    const firestoreUser = {
      name,
      email: user.email,
      createdAt: new Date(),
      type: accountType,
      // profilePictureUrl: imageUrl,
    };

    // setFile(null);

    await setDoc(doc(db, "users", user.uid), firestoreUser);
    setUser({ ...user, ...firestoreUser, setup: true });
  };

  return (
    <div className="p-4 flex flex-col gap-4 items-center pt-10">
      <h1 className="font-bold text-xl">Set up your profile</h1>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label>Name: </label>
          <input
            type="text"
            className="border outline-none p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label>Are you a freelancer or buyer? </label>
          {/* <span className="text-sm font-thin text-gray-600">
            This can be changed later from your settings
          </span> */}

          <select
            className="p-2 border outline-none"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            {accountTypes.map((type: string) => {
              return <option key={type}>{type}</option>;
            })}
          </select>
        </div>
      </div>

      {/* <div className="flex flex-col my-4">
        <label>Upload profile picture</label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e: any) => setFile(e.target.files[0])}
          // style={{ display: "none" }}
        />
        {file && (
          <div className="relative">
            <img src={URL.createObjectURL(file)} width="100" />
            <div className="cursor-pointer" onClick={() => setFile(null)}>
              Delete
            </div>
          </div>
        )}
      </div> */}

      <button
        disabled={!name || name.length < 2 || !accountType}
        className="btn btn-primary"
        onClick={finishProfileSetup}
      >
        Finish Profile Set Up
      </button>
    </div>
  );
}
