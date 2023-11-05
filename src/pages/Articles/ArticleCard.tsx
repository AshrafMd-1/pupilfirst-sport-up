import { Dialog, Transition } from "@headlessui/react";
import {Fragment, useContext, useEffect, useState} from "react";
import { getArticleDetail } from "../../utils/FetchRequest.ts";
import { LoadingScreen } from "../../components/LoadingScreen.tsx";
import { MonthConversion } from "../../utils/UtilityFunctions.ts";
import { Article, ArticleDetail } from "../../types/data.ts";
import {ThemeContext} from "../../context/theme.tsx";

export default function ArticleCard(props: { article: Article }) {
  const [isOpen, setIsOpen] = useState(false);
  const [articleData, setArticleData] = useState<ArticleDetail>();
   const { theme } = useContext(ThemeContext);


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
          className="cursor-pointer min-w-full border-2 shadow-lg rounded-2xl  transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          <article className="flex transition min-w-full ">
            <div className="rotate-180  p-2 [writing-mode:_vertical-lr]">
              <time
                dateTime={new Date(props.article.date).toISOString()}
                className="flex items-center justify-between gap-4 text-xs font-bold uppercase "
              >
                <span>{new Date(props.article.date).getFullYear()}</span>
                <span className="w-px flex-1 bg-gray-500 "></span>
                <span>
                  {MonthConversion(new Date(props.article.date).getMonth()) +
                    " " +
                    new Date(props.article.date).getDate()}
                </span>
              </time>
            </div>

            <div
              className="hidden sm:block sm:basis-56"
              style={{
                backgroundImage: `url(${props.article.thumbnail})`,
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            ></div>

            <div className="flex flex-1 flex-col justify-between">
              <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                <h3 className="font-bold uppercase ">{props.article.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm/relaxed ">
                  {props.article.summary}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="badge rounded-badge badge-primary"># {props.article.sport.name}</div>
                </div>
              </div>
            </div>
          </article>
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
                <Dialog.Panel data-theme={theme} className="w-full border-x border-t lg:max-w-2xl max-w-md transform overflow-hidden rounded-2xl  p-6 text-left align-middle shadow-xl transition-all">
                  {articleData ? (
                    <>
                      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
                      <div className="sm:flex sm:justify-between sm:gap-4">
                        <div>
                          <h3 className="text-lg font-bold  sm:text-xl">
                            {articleData.title}
                          </h3>

                          <p className="mt-1 text-md font-medium ">
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
                          <dt className="text-md font-medium ">
                            Published
                          </dt>
                          <dd className="text-md text-gray-500">
                            {new Date(articleData.date)
                              .toLocaleDateString()
                              .replace(/\//g, "-")}
                          </dd>
                        </div>

                        <div className="flex text-center flex-col-reverse">
                          <dt className="text-md font-medium">
                            Sport
                          </dt>
                          <dd className="text-md text-gray-500">
                            {articleData.sport.name}
                          </dd>
                        </div>

                        {articleData.teams.length === 1 ? (
                          <div className="flex flex-col-reverse">
                            <dt className="text-md mx-auto text-center font-medium ">
                              Team
                            </dt>
                            <dd className="text-md flex gap-2 items-center text-center ">
                              <span className="text-sm text-gray-500">
                                {articleData.teams[0].name}
                              </span>
                            </dd>
                          </div>
                        ) : null}

                        {articleData.teams.length === 2 ? (
                          <div className="flex flex-col-reverse">
                            <dt className="text-md mx-auto text-center font-medium ">
                              Teams
                            </dt>
                            <dd className="text-md flex gap-2 items-center text-center">
                              <span className="text-sm text-gray-500">
                                {articleData.teams[0].name}
                              </span>
                              <span className="text-md  font-bold">
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
