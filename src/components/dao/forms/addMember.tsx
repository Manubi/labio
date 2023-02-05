import { Button } from "@/components/button";
import contractAbi from "@/utils/contractAbi.json";
import { useState } from "react";
import {
  Address,
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import { RadioGroup } from "@headlessui/react";

const settings = [
  {
    name: "Reviewer",
    description: "This project would be available to anyone who has the link",
  },
  {
    name: "Registrant",
    description: "Only members of this project would be able to access",
  },
  {
    name: "Admin",
    description: "You are the only one able to access this project",
  },
  {
    name: "Owner",
    description: "You are the only one able to access this project",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function AddMemberForm() {
  const [selected, setSelected] = useState(settings[0]);
  const { address, isConnecting, isDisconnected } = useAccount();
  const [member, setMember] = useState<string | undefined>(undefined);

  const { config } = usePrepareContractWrite({
    address: contractAbi.DataDaoManager[3141].contractAddress as Address,
    abi: contractAbi.DataDaoManager[3141].contractABI,
    functionName: "createNewInstitutionDAO",
    args: [member],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  function onSubmit(e) {
    e.preventDefault();
    console.log("submitting...");
    write?.();
  }

  function clearForm() {
    setMember(undefined);
  }

  return (
    <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      <div className="flex flex-col">
        <form onSubmit={onSubmit} className="space-y-8 ">
          <div className="space-y-8 ">
            <div>
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Add member to DAO
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  This adds a member to the DAO.
                </p>
              </div>
              <div className="grid grid-cols-1 mt-6 gap-y-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Member address
                  </label>
                  <div className="flex mt-1 rounded-md shadow-sm">
                    <input
                      type="text"
                      name="nameDao"
                      id="nameDao"
                      onChange={(e) => setMember(e.target.value)}
                      className="flex-1 block w-full min-w-0 border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <RadioGroup value={selected} onChange={setSelected}>
                  <RadioGroup.Label className="sr-only">
                    {" "}
                    Privacy setting{" "}
                  </RadioGroup.Label>
                  <div className="-space-y-px bg-white rounded-md">
                    {settings.map((setting, settingIdx) => (
                      <RadioGroup.Option
                        key={setting.name}
                        value={setting}
                        className={({ checked }) =>
                          classNames(
                            settingIdx === 0
                              ? "rounded-tl-md rounded-tr-md"
                              : "",
                            settingIdx === settings.length - 1
                              ? "rounded-bl-md rounded-br-md"
                              : "",
                            checked
                              ? "bg-indigo-50 border-indigo-200 z-10"
                              : "border-gray-200",
                            "relative border p-4 flex cursor-pointer focus:outline-none"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <span
                              className={classNames(
                                checked
                                  ? "bg-indigo-600 border-transparent"
                                  : "bg-white border-gray-300",
                                active
                                  ? "ring-2 ring-offset-2 ring-indigo-500"
                                  : "",
                                "mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center"
                              )}
                              aria-hidden="true"
                            >
                              <span className="rounded-full bg-white w-1.5 h-1.5" />
                            </span>
                            <span className="flex flex-col ml-3">
                              <RadioGroup.Label
                                as="span"
                                className={classNames(
                                  checked ? "text-indigo-900" : "text-gray-900",
                                  "block text-sm font-medium"
                                )}
                              >
                                {setting.name}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as="span"
                                className={classNames(
                                  checked ? "text-indigo-700" : "text-gray-500",
                                  "block text-sm"
                                )}
                              >
                                {setting.description}
                              </RadioGroup.Description>
                            </span>
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>
              {isSuccess && (
                <div>
                  Successfully created DAO with address:
                  <div>
                    <a
                      href={`https://hyperspace.filfox.info/en/address/${data?.hash}`}
                    >
                      Filfox
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="button" variant="white" onClick={clearForm}>
              Clear form
            </Button>
            <Button type="submit" className="inline-flex justify-center ml-3">
              Add member
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
