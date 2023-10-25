import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Article, ArticleDetail } from "../../types/types.ts";
import { getArticleDetail } from "../../utils/FetchRequest.ts";
import { LoadingScreen } from "../../components/LoadingScreen.tsx";

export default function ArticleCard(props: { article: Article }) {
  const [isOpen, setIsOpen] = useState(false);
  const [articleData, setArticleData] = useState<ArticleDetail>();

  useEffect(() => {
    if (isOpen) {
      const fetchArticleDetail = async () => {
        const res = await getArticleDetail(props.article.id);
        setArticleData(res);
      };
      fetchArticleDetail();
    }
  }, [isOpen, props.article.id]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="rounded-2xl">
      <div className="flex items-center w-full mx-auto my-3">
        <div
          onClick={openModal}
          className="cursor-pointer border-r border-b border-l  rounded-b-2xl lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t lg:border-gray-400 border-gray-400 lg:flex min-w-full bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 "
        >
          <div
            className="h-48  lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
            style={{
              backgroundImage: `url(${props.article.thumbnail})`,
              backgroundPosition: "center center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="  bg-white  p-4 flex flex-col justify-between leading-normal">
            <div className="mb-8">
              <div className="text-gray-900 font-bold text-xl mb-2">
                {props.article.title}
              </div>
              <p className="text-gray-700 text-base">{props.article.summary}</p>
            </div>
            <div className="flex items-center">
              <div className="text-sm">
                <p className="text-gray-900 leading-none">
                  {props.article.sport.name}
                </p>
                <p className="text-gray-600">
                  {new Date(props.article.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full lg:max-w-2xl max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {articleData ? (
                    <>
                      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                      <div className="sm:flex sm:justify-between sm:gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                            {articleData.title}
                          </h3>

                          <p className="mt-1 text-md font-medium text-gray-600">
                            {articleData.summary}
                          </p>
                        </div>

                        <div className="block sm:block sm:shrink-0">
                          <img
                            alt="thumbnail"
                            src={articleData.thumbnail}
                            className="h-20 w-20 rounded-lg object-cover shadow-sm"
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className=" text-md  ">{articleData.content}</p>
                      </div>

                      <dl className="mt-6 flex text-center justify-evenly gap-4 sm:gap-6">
                        <div className="flex flex-col-reverse">
                          <dt className="text-md font-medium text-gray-600">
                            Published
                          </dt>
                          <dd className="text-md text-gray-500">
                            {new Date(articleData.date)
                              .toLocaleDateString()
                              .replace(/\//g, "-")}
                          </dd>
                        </div>

                        <div className="flex text-center flex-col-reverse">
                          <dt className="text-md font-medium text-gray-600">
                            Sport
                          </dt>
                          <dd className="text-md text-gray-500">
                            {articleData.sport.name}
                          </dd>
                        </div>

                        {articleData.teams.length === 1 ? (
                          <div className="flex flex-col-reverse">
                            <dt className="text-md mx-auto text-center font-medium text-gray-600">
                              Team
                            </dt>
                            <dd className="text-md flex gap-2 items-center text-center text-gray-500">
                              <span className="text-sm text-gray-500">
                                {articleData.teams[0].name}
                              </span>
                            </dd>
                          </div>
                        ) : null}

                        {articleData.teams.length === 2 ? (
                          <div className="flex flex-col-reverse">
                            <dt className="text-md mx-auto text-center font-medium text-gray-600">
                              Teams
                            </dt>
                            <dd className="text-md flex gap-2 items-center text-center text-gray-500">
                              <span className="text-sm text-gray-500">
                                {articleData.teams[0].name}
                              </span>
                              <span className="text-md text-gray-500 font-bold">
                                vs
                              </span>
                              <span className="text-sm text-gray-500">
                                {articleData.teams[1].name}
                              </span>
                            </dd>
                          </div>
                        ) : null}
                      </dl>
                    </>
                  ) : (
                    <LoadingScreen />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
