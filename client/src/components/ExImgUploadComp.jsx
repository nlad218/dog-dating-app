import {useEffect, useRef} from 'react'

const UploadWidget = () => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const imageId = "";
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        // console.log(cloudinaryRef.current);
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dkxtk2v4z",
            uploadPreset: "dogprofile_test"
        }, function(error, result) {
            console.log(result)
            console.log(result.info.public_id)
            imageId = result.info.public_id


        })
    }, [])
    return (
        <button onClick = {() => widgetRef.current.open()} className = "border-8 border-red-400">Click Here to Upload Image</button>
    )
}

export default {UploadWidget, imageId};