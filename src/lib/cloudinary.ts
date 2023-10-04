import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = (
  file: string,
  folder: string
): Promise<{ public_id: string; url: string }> => {
  return new Promise(async (resolve, reject) => {
    const result = await cloudinary.v2.uploader.upload(file, {
      folder,
      resource_type: "auto",
    });
    resolve({
      public_id: result.public_id,
      url: result.url,
    });
  });
};

export const deleteImage = async (file: string): Promise<boolean> => {
  const res = await cloudinary.v2.uploader.destroy(file);

  if (res.result === "ok") {
    return true;
  } else {
    return false;
  }
};
