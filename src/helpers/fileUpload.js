const fileUpload = async( file ) => {
  if( !file ) throw new Error('No existen archivos a subir.');

  const cloudURL = 'https://api.cloudinary.com/v1_1/ddscohuwy/upload';

  const formData = new FormData();
  formData.append('upload_preset', 'journal-react');
  formData.append('file', file);

  try {

    const response = await fetch( cloudURL, {
      method: 'POST',
      body: formData,
    });
    if( !response.ok ) throw new Error('No se pudo subir el archivo');

    const cloudResponse = await response.json();
    return cloudResponse.secure_url;

  } catch(error) {
    console.log( error );
    throw new Error( error.message );
  }

}

export { fileUpload };