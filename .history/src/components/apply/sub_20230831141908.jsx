const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, email, phoneNumber, coverLetter, cvFile, driverLicense, ssnCopy } = formData;

    // Function to upload a file to a specific folder
    const uploadFileToFolder = async (file, folderRef) => {
      try {
        const fileRef = ref(folderRef, file.name);
        await uploadBytes(fileRef, file);
        // console.log(`File ${file.name} uploaded successfully to ${folderRef}`);
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error);
      }
    };

    // Upload CV to folder1
    await uploadFileToFolder(cvFile, folder1Ref);

    // Upload driver license to folder2
    await uploadFileToFolder(driverLicense, folder2Ref);

    // Upload SSN copy to folder3
    await uploadFileToFolder(ssnCopy, folder3Ref);

    const fetchFiles = async () => {
      try {
        const cvFileRef = ref(folder1Ref, cvFile.name);
        const driverLicenseRef = ref(folder2Ref, driverLicense.name);
        const ssnCopyRef = ref(folder3Ref, ssnCopy.name);

        const [cvFileUrl, driverLicenseUrl, ssnCopyUrl] = await Promise.all([
          getDownloadURL(cvFileRef),
          getDownloadURL(driverLicenseRef),
          getDownloadURL(ssnCopyRef),
        ]);

        return { cvFileUrl, driverLicenseUrl, ssnCopyUrl };
      } catch (error) {
        console.error('Error fetching files:', error);
        return {};
      }
    };

    const { cvFileUrl, driverLicenseUrl, ssnCopyUrl } = await fetchFiles();
    
    
    const formDataToSubmit = new FormData();
    formDataToSubmit.append('sender[name]', 'JobConnect360');
    formDataToSubmit.append('sender[email]', 'jobconnect360site@gmail.com');
    formDataToSubmit.append('recipients', 'akinolapo@gmail.com');
    formDataToSubmit.append('subject', 'New Application Alert!');
    formDataToSubmit.append(
      'message',
      `Find attached the cover letter and resume for this candidate: <br/> Full Name: ${fullName} <br/> Email: ${email} <br/> Phone Number: ${phoneNumber} <br/> Cover Letter: ${coverLetter} <br/> <a href='${cvFileUrl}'>Click to See CV</a> <br/> <a href='${driverLicenseUrl}'>Click to See Driver License</a> <br/> <a href='${ssnCopyUrl}'>Click to See SSN</a> `
    );
    // formDataToSubmit.append('attachments', cvFile, "Candidates's CV");
    // formDataToSubmit.append('attachments', driverLicense, "Candidates's Driver License ");
    // formDataToSubmit.append('attachments', ssnCopy, "Candidate's SSN");

    try {
      await axios.post('https://api.smtpexpress.com/send', formDataToSubmit, {
        headers: {
          Authorization: 'Bearer 6f32027e9bdddb03f1da6421af860842861ced47da1c5befbd',
        },
      });

      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };