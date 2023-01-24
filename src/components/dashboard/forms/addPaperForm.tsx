import { Button } from "@/components/button";
import lighthouse from "@lighthouse-web3/sdk";
import { ethers } from "ethers";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function AddPaperForm() {
  const [data, setData] = useState(null);
  const [encrypted, setEncrypted] = useState(false);

  const { register, handleSubmit } = useForm();

  const encryptionSignature = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const messageRequested = (await lighthouse.getAuthMessage(address)).data
      .message;
    const signedMessage = await signer.signMessage(messageRequested);
    return {
      signedMessage: signedMessage,
      publicKey: address,
    };
  };

  //percentage of upload data done
  const progressCallback = (progressData) => {
    const total = progressData?.total;
    const uploaded = progressData?.uploaded;
    const percentageToBeDone = parseInt((total / uploaded).toFixed(2));
    let percentageDone = 100 - percentageToBeDone;
    console.log("percentageDone", percentageDone);
  };

  const onSubmit = async (data) => {
    if (!data) throw Error("No file selected");
    const fileUrl = await uploadData();
    console.log("fileUrl :>> ", fileUrl);
  };

  const uploadData = async () => {
    // upload encrypted file to IPFS and return the url
    if (encrypted) {
      const sig = await encryptionSignature();
      const response = await lighthouse.uploadEncrypted(
        data,
        sig.publicKey,
        process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
        sig.signedMessage,
        progressCallback
      );
      const url = `https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`;
      console.log("Encrypted FileUrl: ", url);
      return url;
    }
    // upload unencrypted file to IPFS and return the url
    const response = await lighthouse.upload(
      data,
      process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY,
      progressCallback
    );
    const url = `Vhttps://gateway.lighthouse.storage/ipfs/${response.data.Hash}`;
    console.log("File URL: ", url);
    return url;
  };

  const getAccessConditions = async () => {
    const cid = "QmdK4iv8R1VBuE62ZEse4sSmmKfqGWDtxkngzwwmZbeHeH";
    const response = await lighthouse.getAccessConditions(cid);

    // Display response
    console.log("ACCESSCON:", response);
  };
  console.log("encrypted :>>", encrypted);
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
                <div className="sm:col-span-4">
                  <div className="flex items-start h-">
                    <input
                      id="encrypt"
                      aria-describedby="encrypt-description"
                      name="encrypt"
                      type="checkbox"
                      onChange={() => setEncrypted(!encrypted)}
                      className="w-4 h-4 mt-[0.5px] text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />

                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="encrypt"
                        className="font-medium text-gray-700"
                      >
                        Encrypt data
                      </label>
                      <p id="encrypt-description" className="text-gray-500">
                        The data will be encrypted before being stored on the
                        IPFS public network. Meaning it can only be accessed by
                        the persons who have the key to decrypt the data once
                        downloaded.
                      </p>
                    </div>
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
                            onChange={(e) => setData(e)}
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
              <Button type="button" variant="white">
                Clear form
              </Button>
              <Button type="submit" className="inline-flex justify-center ml-3">
                Save Paper
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
