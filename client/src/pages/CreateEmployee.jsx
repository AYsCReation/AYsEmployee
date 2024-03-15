import React, {useEffect, useState ,useRef} from 'react';
import app from '../firebase';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'

const CreateEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileno: '',
    designation: 'HR',
    gender: '',
    course: [],
    image: ''
  });
  const fileInputRef = useRef(null);
  const [file , setFile] = useState(undefined);
  const [filePerc , setFilePerc] = useState(0);
  const [fileUploadError , setFileUploadError] = useState(false);
  const [mainError , setMainError] = useState(null);
  const handleFileUpload = (file) =>{
    setFileUploadError(false);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage , fileName);
    const uploadTask = uploadBytesResumable(storageRef , file);
    uploadTask.on('state_changed' , 
    (snapshot) =>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePerc(Math.floor(progress));
    }, (error) => {
      setFileUploadError(true);
    },
    () =>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>   {
        setFormData({...formData , image : downloadURL});
        console.log("uploaded")
      })
    },
    );
   

  }; 
  
  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (checked) {
        setFormData(prevState => ({
          ...prevState,
          course: [...prevState.course, value]
        }));
      } else {
        setFormData(prevState => ({
          ...prevState,
          course: prevState.course.filter(cours => cours !== value)
        }));
      }
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  const handleChooseFile = () => {
    fileInputRef.current.click();
  };
  const handleSubmitData = async(e) =>{
    e.preventDefault();
    
    
    if(formData.mobileno.length !== 10){
        setMainError('please type the correct number!');
        return;
    }
    if(formData.gender === ''){
        setMainError('please select the gender!');
        return;
    }
    if(formData.course.length === 0){
        setMainError('please select atleast one course!');
        return;
    }
    if(formData.image === ''){
        setFileUploadError('please upload the image!');
        return;
    }
    console.log(formData)

    try {
     
      setMainError(null);
      setFileUploadError(false);
    const res = await fetch('/api/listing/create' , {
      method : "POST",
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify({...formData})
    })
    const data = await res.json();
    if(data.success === false){
        setMainError(data.message);
      return;
    }
    alert('Employee Added Successfully!')
    setFormData({
        name: '',
        email: '',
        mobileno: '',
        designation: 'HR',
        gender: '',
        course: [],
        image: ''
      });
  } catch (error) {
    setMainError(error.message);
  }
 }
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200 mt-5">
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmitData}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" id="name" name="name" className="mt-1 p-2 block w-full border rounded-md border-gray-300 focus:outline-none focus:border-blue-500" value={formData.name} onChange={handleChange} placeholder="Enter your name" required/>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" id="email" name="email" className="mt-1 p-2 block w-full border rounded-md border-gray-300 focus:outline-none focus:border-blue-500" value={formData.email} onChange={handleChange} placeholder="Enter your email" required/>
        </div>
        <div className="mb-4">
          <label htmlFor="mobileno" className="block text-sm font-medium text-gray-700">Mobile No</label>
          <input type="tel" id="mobileno" name="mobileno" pattern="[0-9]*" className="mt-1 p-2 block w-full border rounded-md border-gray-300 focus:outline-none focus:border-blue-500" value={formData.mobileno} onChange={handleChange} placeholder="Enter your mobile number" required/>
        </div>
        <div className="mb-4">
          <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Designation</label>
          <select id="designation" name="designation" className="mt-1 p-2 block w-full border rounded-md border-gray-300 focus:outline-none focus:border-blue-500" value={formData.designation} onChange={handleChange} required>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <div className="flex items-center">
            <input type="radio" id="male" name="gender" className="mr-2" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
            <label htmlFor="male" className="mr-4">Male</label>
            <input type="radio" id="female" name="gender" className="mr-2" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
            <label htmlFor="female" className="mr-4">Female</label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Course</label>
          <div className="flex items-center">
            <input type="checkbox" id="mca" name="course" className="mr-2" value="MCA" checked={formData.course.includes('MCA')} onChange={handleChange} />
            <label htmlFor="mca" className="mr-4">MCA</label>
            <input type="checkbox" id="bca" name="course" className="mr-2" value="BCA" checked={formData.course.includes('BCA')} onChange={handleChange} />
            <label htmlFor="bca" className="mr-4">BCA</label>
            <input type="checkbox" id="bsc" name="course" className="mr-2" value="BSC" checked={formData.course.includes('BSC')} onChange={handleChange} />
            <label htmlFor="bsc">BSC</label>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-center items-center">
            <input type="file" id="img" name="image" accept='image/*' className="hidden" onChange={(e) => setFile(e.target.files[0])} ref={fileInputRef} />
            <button type="button" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline" onClick={handleChooseFile}>
              Add Your Photo
            </button>
           
          </div>
          <p className='text-sm text-center'>
          {fileUploadError ? (<span className='text-red-700'>file upload error!</span>) : filePerc > 0 && filePerc < 100 ? (<span className='text-blue-700'>{` ${filePerc}% uploading... `}</span>) : filePerc == 100 ? (<span className='text-green-700'>File Uploaded Successfully!</span>) : ""}
        </p>
        <p className='text-sm text-center'>
          {(!fileUploadError && mainError) ? (<span className='text-red-700'>{mainError}</span>) :  ""}
        </p>
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full text-center focus:outline-none focus:shadow-outline">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployee;
