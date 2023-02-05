export function WhatsNew() {
  return (
    <div>
      <dl className="overflow-hidden bg-white border border-gray-300 rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">What's new</dt>

          <dd className="flex items-baseline justify-between mt-1 md:block lg:flex">
            <div className="flex items-baseline">
              <span className="text-sm font-medium text-gray-500 ">
                Added upload of metadata to ComposableDB
              </span>
            </div>

            <div className=" text-gray-500 inline-flex items-baseline px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0">
              <span aria-hidden="true">→</span>
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}
