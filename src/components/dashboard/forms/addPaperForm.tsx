import lighthouse from "@lighthouse-web3/sdk";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function AddPaperForm() {
  const [paperFile, setPaperFile] = useState(null);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (!paperFile) throw Error("No file selected");
    const fileUrl = await deployImage();
    console.log("fileUrl :>> ", fileUrl);
    console.log("data :>> ", data);
  };

  const onChangePaperFile = (e) => {
    setPaperFile(URL.createObjectURL(e.target.files[0]));
  };

  const deployImage = async () => {
    const progressCallback = (progressData) => {
      const total = progressData?.total;
      const uploaded = progressData?.uploaded;
      const percentageToBeDone = parseInt((total / uploaded).toFixed(2));
      let percentageDone = 100 - percentageToBeDone;
      console.log("percentageDone", percentageDone);
    };

    const output = await lighthouse.upload(
      paperFile,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
      progressCallback
    );
    console.log("File Status:", output);
    const url = `Visit at https://gateway.lighthouse.storage/ipfs/${output.data.Hash}`;
    return url;
  };

  const getAccessConditions = async () => {
    const cid = "QmdK4iv8R1VBuE62ZEse4sSmmKfqGWDtxkngzwwmZbeHeH";
    const response = await lighthouse.getAccessConditions(cid);

    // Display response
    console.log("ACCESSCON:", response);
  };

  return (
    <div className="px-4 pt-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <button onClick={() => getAccessConditions()}>
          get Access Conditions
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8 divide-y divide-gray-200"
        >
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Add Paper
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>

              <div className="grid grid-cols-1 mt-6 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <div className="flex mt-1 rounded-md shadow-sm">
                    <input
                      type="text"
                      name="title"
                      {...register("title", { required: true })}
                      id="title"
                      className="flex-1 block w-full min-w-0 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Authors
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="authors"
                      name="authors"
                      {...register("authors", { required: true })}
                      rows={3}
                      className="block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      defaultValue={""}
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label
                    htmlFor="cover-photo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Upload File
                  </label>
                  <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="w-12 h-12 mx-auto text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            onChange={(e) => setPaperFile(e)}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Clear form
              </button>
              <button
                type="submit"
                className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Save Paper
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
