import {useEffect, useRef, useState} from 'react'
import React from 'react'
import {Cloudinary} from "@cloudinary/url-gen";
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
// import {UploadWidget, imageId} from '../components/ExImgUploadComp';


export default function ExImgUpload() {
    const [imageId, setImageId] = useState("eimq5aiwwim0kdjdztmg")
    // Create a Cloudinary instance and set your cloud name.
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'dkxtk2v4z'
        }
      });
      const cloudinaryRef = useRef();
      const widgetRef = useRef();
      useEffect(() => {
          cloudinaryRef.current = window.cloudinary;
          // console.log(cloudinaryRef.current);
          widgetRef.current = cloudinaryRef.current.createUploadWidget({
              cloudName: "dkxtk2v4z",
              uploadPreset: "dogprofile_test"
          }, function(error, result) {
              console.log(result.info.public_id)
              if(result.info.public_id){
                setImageId(result.info.public_id)
              }
          })
      })

        // Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
    const myImage = cld.image(imageId); 
  
    // Resize to 250 x 250 pixels using the 'fill' crop mode.
    myImage.resize(fill().width(500).height(250));
  
    // Render the image in a React component.
    console.log("hello" + myImage)
	return <>
    <button onClick = {() => widgetRef.current.open()} className = "border-8 border-red-400 block">Click Here to Upload Image</button>
    <AdvancedImage cldImg={myImage} className = "block" />
    </> ;
}
//comment
