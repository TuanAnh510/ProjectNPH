import { FiLock, FiMail, FiUser } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";
//internal import
import Error from "@component/form/Error";
import InputArea from "@component/form/InputArea";
import useLoginSubmit from "@hooks/useLoginSubmit";

const Register = ({ setShowResetPassword, setModalOpen }) => {
  const { handleSubmit, submitHandler, register, errors, loading } =
    useLoginSubmit(setModalOpen);
    const { t } = useTranslation();

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold font-serif">{t("common:signingUp")}</h2>
        <p className="text-sm md:text-base text-gray-500 mt-2 mb-8 sm:mb-10">
        {t("common:createAccount")}
        </p>
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-center"
      >
        <div className="grid grid-cols-1 gap-5">
          <div className="form-group">
            <InputArea
              register={register}
              label={t("common:name")}
              name="name"
              type="text"
              placeholder={t("common:name")}
              Icon={FiUser}
            />

            <Error errorName={errors.name} />
          </div>

          <div className="form-group">
            <InputArea
              register={register}
              label={t("common:email")}
              name="email"
              type="email"
              placeholder={t("common:email")}
              Icon={FiMail}
            />
            <Error errorName={errors.email} />
          </div>
          <div className="form-group">
            <InputArea
              register={register}
              label={t("common:password")}
              name="password"
              type="password"
              placeholder={t("common:password")}
              Icon={FiLock}
            />

            <Error errorName={errors.password} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex ms-auto">
              <button
                type="button"
                onClick={() => setShowResetPassword(true)}
                className="text-end text-sm text-heading ps-3 underline hover:no-underline focus:outline-none"
              >
                {t("common:forgotPassword")}
              </button>
            </div>
          </div>
          {loading ? (
            <button
              disabled={loading}
              type="submit"
              className="md:text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md placeholder-white focus-visible:outline-none focus:outline-none bg-green-600 text-white px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-green-600 h-12 mt-1 text-sm lg:text-sm w-full sm:w-auto"
            >
              <img
                src="/loader/spinner.gif"
                alt="Loading"
                width={20}
                height={10}
              />
              <span className="font-serif ml-2 font-light">{t("common:processing")}</span>
            </button>
          ) : (
            <button
              disabled={loading}
              type="submit"
              className="w-full text-center py-3 rounded bg-green-600 text-white hover:bg-green-600 transition-all focus:outline-none my-1"
            >
              {t("common:signingUp")}
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default Register;
