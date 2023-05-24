import React, { useState } from 'react';
import { iconsList } from '../Icons';
import Button from '../Button/Button';
import ToastComponent from '../Toastify/ToastifyComponent';
import { toast } from 'react-toastify';
import { realtorData } from '../../constants/consts/realtor';
import ContactFormServices from '../../services/ContactFormServices';

const ContactForm = ({ title, subtitle }) => {
  const { FaUserAlt, BsFillTelephoneFill, FiMail } = iconsList;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    terms: false,
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState({
    allFieldRequierd: '',
    serverEmailError: '',
  });

  /** Handle Form Data inputs */
  /** Update Name */
  const handleName = (name) => {
    setFormData({
      ...formData,
      name: name,
    });
  };
  /** Update Email */
  const handleEmail = (email) => {
    setFormData({
      ...formData,
      email: email,
    });
  };

  /** Update Phone */
  const handlePhone = (phone) => {
    setFormData({
      ...formData,
      phone: phone,
    });
  };

  /** Update CHECKBOX */
  const handleVerification = (ev) => {
    setFormData({
      ...formData,
      terms: ev.target.checked,
    });
  };

  /** On toast success */
  const showToastSuccessMsg = (msg) => {
    toast.success(msg, {
      position: 'bottom-center',
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  /** On toast error */
  const showToastErrorMsg = (msg) => {
    toast.error(msg, {
      position: 'bottom-center',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (
      [formData?.name, formData?.email, formData?.phone].includes('') ||
      formData.terms === false
    ) {
      showToastErrorMsg(
        'Todos los campos son obligatorios, y debes aceptar los terminos y condiciones'
      );
      return;
    }

    try {
      setLoading(true);
      const response = await ContactFormServices.sendContactForm(
        formData?.name,
        formData?.email,
        formData?.phone,
        realtorData?.email
      );

      if ((await response.success) === 'true') {
        setLoading(false);
        setErrorMsg({
          allFieldRequierd: '',
          serverEmailError: '',
        });
        showToastSuccessMsg(
          `Solicitud enviada exitosamente, dentro de poco de contactaremos`
        );
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      }
    } catch (error) {
      showToastErrorMsg('Ha ocurrido un error al enviar el formulario');
      console.log('error', error);
    }
  };

  console.log(formData);

  return (
    <div className="bg-gray-200 rounded-[50px] p-4 my-10 xl:py-5 xl:px-10 xl:m-0">
      <ToastComponent />
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-700 py-3">{title}</h2>
        {subtitle && (
          <p className="text-md font-bold text-gray-700">{subtitle}</p>
        )}
      </div>
      <form name="FormSubmit" onSubmit={handleSubmit} className="py-6">
        <div className="flex mb-5">
          <div className="w-1/5 flex justify-start items-center">
            <i className="p-4 rounded-full bg-white ml-2">
              <FaUserAlt className="text-xl text-gray-300" />
            </i>
          </div>
          <div className="w-5/6 flex justify-center items-center flex-col">
            <input
              type="text"
              placeholder="Nombre"
              name="name"
              id="name"
              className="w-full p-3 rounded-full bg-white text-lg text-gray-900 placeholder:text-gray-500 placeholder:font-bold outline-none "
              value={formData?.name}
              onChange={(ev) => handleName(ev.target.value)}
            />
          </div>
        </div>

        <div className="flex mb-5">
          <div className="w-1/5 flex justify-start items-center">
            <i className="p-4 rounded-full bg-white  ml-2">
              <BsFillTelephoneFill className="text-xl text-gray-300" />
            </i>
          </div>
          <div className="w-5/6 flex justify-center items-center flex-col">
            <input
              type="phone"
              name="phone"
              id="phone"
              placeholder="Teléfono"
              className="w-full p-3 rounded-full bg-white text-lg text-gray-900 placeholder:text-gray-500 placeholder:font-bold outline-none"
              value={formData?.phone}
              onChange={(ev) => handlePhone(ev.target.value)}
              pattern="[0-9]{9}"
              maxLength="9"
            />
          </div>
        </div>

        <div className="flex mb-5">
          <div className="w-1/5 flex justify-start items-center">
            <i className="p-4 rounded-full bg-white  ml-2">
              <FiMail className="text-xl text-gray-300" />
            </i>
          </div>
          <div className="w-5/6 flex justify-center items-center flex-col">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Correo electrónico"
              className=" w-full p-3 rounded-full bg-white text-lg text-gray-900 placeholder:text-gray-500 placeholder:font-bold outline-none"
              value={formData?.email}
              onChange={(ev) => handleEmail(ev.target.value)}
            />
          </div>
        </div>

        <div className="flex w-5/6 mx-auto my-14 mb-10">
          <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
            <input
              className="outline-none relative float-left mt-[0.15rem] mr-[6px] -ml-[1.5rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-orange-500 checked:bg-orange-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#ca6f3b] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:ml-[0.25rem] checked:focus:after:-mt-px checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-t-0 checked:focus:after:border-l-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-orange-500 dark:checked:bg-orange-500"
              type="checkbox"
              id="checkboxTerms"
              name="checkboxTerms"
              checked={formData?.terms || false}
              onChange={handleVerification}
            />
            <label
              className="inline-block pl-[0.15rem] hover:cursor-pointer"
              htmlFor="checkboxTerms"
            >
              Al continuar estás aceptando los términos y condiciones y la
              política de privacidad
            </label>
          </div>
        </div>

        <div className="flex mb-5 justify-center items-center">
          <Button
            type="submit"
            className="block w-[200px] p-4 my-1 uppercase font-semibold text-md rounded-full hover:shadow-sm transition ease-in-out duration-300 text-white bg-orange-500 hover:bg-orange-600"
          >
            <span className="max-h-10">
              {loading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-4 h-4 text-gray-100 animate-spin fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Cargando...</span>
                </div>
              ) : (
                'Contactarme'
              )}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
