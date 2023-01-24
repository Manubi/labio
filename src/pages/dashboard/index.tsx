import { DashboardLayout } from "@/components/dashboard/layout";

import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const positions = [
  {
    id: 1,
    title: "Mesolimbic dopamine adapts the rate of learning from action",
    journal: "Nature",
    closeDate: "2020-01-07",
    closeDateFull: "January, 2020",
    applicants: [
      {
        name: "Dries Vincent",
        email: "dries.vincent@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Lindsay Walton",
        email: "lindsay.walton@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Courtney Henry",
        email: "courtney.henry@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Tom Cook",
        email: "tom.cook@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 2,
    title:
      "In-plane charged domain walls with memristive behaviour in a ferroelectric film",
    journal: "Cell",
    closeDate: "2020-01-07",
    closeDateFull: "January, 2020",
    applicants: [
      {
        name: "Whitney Francis",
        email: "whitney.francis@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Leonard Krasner",
        email: "leonard.krasner@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Floyd Miles",
        email: "floyd.miles@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
  {
    id: 3,
    title:
      "The person-to-person transmission landscape of the gut and oral microbiomes",
    journal: "Science",
    closeDate: "2020-01-14",
    closeDateFull: "December, 2019",
    applicants: [
      {
        name: "Emily Selman",
        email: "emily.selman@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Kristin Watson",
        email: "kristin.watson@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      {
        name: "Emma Dorsey",
        email: "emma.dorsey@example.com",
        imageUrl:
          "https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
    ],
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="px-4 py-5 bg-white border-b border-gray-200 rounded-t-lg sm:px-6">
        <div className="flex flex-wrap items-center justify-between -mt-4 -ml-4 sm:flex-nowrap">
          <div className="mt-4 ml-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Data
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              The data you have uploaded to the platform.
            </p>
          </div>
          <div className="flex-shrink-0 mt-4 ml-4">
            <button
              type="button"
              className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Upload new data
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-white sm:rounded-md">
        <ul role="list" className="divide-y">
          {positions.map((position) => (
            <li key={position.id}>
              <a href="#" className="block hover:bg-gray-50">
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="flex-1 min-w-0 sm:flex sm:items-center sm:justify-between">
                    <div className="truncate">
                      <div className="flex text-sm">
                        <p className="font-medium text-indigo-600 truncate">
                          {position.title}
                        </p>
                        <p className="flex-shrink-0 ml-1 font-normal text-gray-500">
                          in {position.journal}
                        </p>
                      </div>
                      <div className="flex mt-2">
                        <div className="flex items-center text-sm text-gray-500">
                          <CalendarIcon
                            className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                          <p>
                            Published in{" "}
                            <time dateTime={position.closeDate}>
                              {position.closeDateFull}
                            </time>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 mt-4 sm:mt-0 sm:ml-5">
                      <div className="flex -space-x-1 overflow-hidden">
                        {position.applicants.map((applicant) => (
                          <img
                            key={applicant.email}
                            className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
                            src={applicant.imageUrl}
                            alt={applicant.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-5">
                    <ChevronRightIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
}
