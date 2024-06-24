export default function Footer() {
  return (
    // <div className="container my-5 mx-auto">
    <footer className="text-white text-lg bg-footer-color flex justify-center">
      <div className="p-4 pb-0 max-w-7xl">
        <section className="">
          <div className="grid grid-rows-4 md:grid-rows-none md:grid-cols-4">
            <div className="font-serif col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="uppercase font-bold">Company name</h6>
              <hr className="mb-6" />
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>

            <hr className="w-100 mt-12 md:hidden" />

            <div className="font-serif col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="uppercase font-bold">Products</h6>
              <hr className="mb-6" />
              <p>
                <a
                  href="https://www.smilefoundationindia.org/health/#"
                  className="hover:text-green-500"
                >
                  MdBootstrap
                </a>
              </p>
              <p>
                <a
                  href="https://www.smilefoundationindia.org/health/#"
                  className="hover:text-green-500"
                >
                  MDWordPress
                </a>
              </p>
              <p>
                <a
                  href="https://www.smilefoundationindia.org/health/#"
                  className="hover:text-green-500"
                >
                  BrandFlow
                </a>
              </p>
              <p>
                <a
                  href="https://www.smilefoundationindia.org/health/#"
                  className="hover:text-green-500"
                >
                  Bootstrap Angular
                </a>
              </p>
            </div>

            <hr className="w-100  mt-12 md:hidden" />

            <div className="font-serif col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
              <h6 className="uppercase font-bold">Useful links</h6>
              <hr className="mb-6" />
              <p>
                <a
                  href="https://www.smilefoundationindia.org/health/#"
                  className="hover:text-green-500"
                >
                  Your Account
                </a>
              </p>
              <p>
                <a
                  href="https://www.smilefoundationindia.org/health/#"
                  className="hover:text-green-500"
                >
                  Become an Affiliate
                </a>
              </p>
              <p>
                <a
                  href="https://www.smilefoundationindia.org/health/#"
                  className="hover:text-green-500"
                >
                  Shipping Rates
                </a>
              </p>
              <p>
                <a
                  href="https://www.smilefoundationindia.org/health/#"
                  className="hover:text-green-500"
                >
                  Help
                </a>
              </p>
            </div>

            <hr className="w-100 mt-12 md:hidden" />

            <div className="font-serif col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
              <h6 className="uppercase font-bold">Contact</h6>
              <hr className="mb-6" />
              <p className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
                <span>abc@mail.com</span>
              </p>
              <p className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>

                <span>+91 1234567890</span>
              </p>
            </div>
          </div>
        </section>

        <hr className="my-3" />

        <section className="p-3 pt-0">
          <div className="flex justify-between font-serif">
            <div className="col-md-7 col-lg-8 text-center text-md-start">
              <div className="p-3">
                © 2020 Copyright:
                <a className="" href="https://mdbootstrap.com/">
                  MDBootstrap.com
                </a>
              </div>
            </div>

            <div className="flex space-x-3">
              <a className="" role="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  fill="none"
                  viewBox="0 0 48 48"
                  id="instagram"
                  className="size-10"
                >
                  <rect width="48" height="48" fill="#262626" rx="24"></rect>
                  <path
                    fill="#fff"
                    d="M19.0014 24C19.0014 21.2387 21.2393 18.9996 24.0006 18.9996C26.7619 18.9996 29.001 21.2387 29.001 24C29.001 26.7613 26.7619 29.0004 24.0006 29.0004C21.2393 29.0004 19.0014 26.7613 19.0014 24ZM16.2983 24C16.2983 28.254 19.7466 31.7023 24.0006 31.7023C28.2546 31.7023 31.7029 28.254 31.7029 24C31.7029 19.746 28.2546 16.2977 24.0006 16.2977C19.7466 16.2977 16.2983 19.746 16.2983 24ZM30.2078 15.9923C30.2077 16.3483 30.3131 16.6963 30.5108 16.9924C30.7085 17.2885 30.9895 17.5193 31.3183 17.6557C31.6472 17.7921 32.0091 17.8279 32.3583 17.7586C32.7075 17.6892 33.0283 17.5179 33.2801 17.2663C33.532 17.0147 33.7035 16.694 33.7731 16.3449C33.8427 15.9957 33.8072 15.6338 33.6711 15.3048C33.535 14.9759 33.3044 14.6947 33.0085 14.4968C32.7125 14.2989 32.3646 14.1931 32.0086 14.193H32.0078C31.5306 14.1932 31.073 14.3828 30.7355 14.7202C30.398 15.0576 30.2082 15.5151 30.2078 15.9923ZM17.9406 36.2096C16.4782 36.143 15.6833 35.8994 15.155 35.6936C14.4547 35.421 13.955 35.0963 13.4297 34.5716C12.9043 34.047 12.5791 33.5478 12.3077 32.8475C12.1018 32.3195 11.8582 31.5244 11.7917 30.0619C11.719 28.4808 11.7044 28.0058 11.7044 24.0001C11.7044 19.9944 11.7202 19.5208 11.7917 17.9383C11.8583 16.4759 12.1037 15.6823 12.3077 15.1528C12.5803 14.4524 12.905 13.9528 13.4297 13.4274C13.9543 12.902 14.4535 12.5768 15.155 12.3054C15.683 12.0995 16.4782 11.8559 17.9406 11.7894C19.5217 11.7167 19.9967 11.7022 24.0006 11.7022C28.0045 11.7022 28.48 11.7179 30.0624 11.7894C31.5248 11.856 32.3184 12.1014 32.848 12.3054C33.5483 12.5768 34.048 12.9028 34.5733 13.4274C35.0987 13.952 35.4227 14.4524 35.6953 15.1528C35.9012 15.6808 36.1448 16.4759 36.2113 17.9383C36.284 19.5208 36.2986 19.9944 36.2986 24.0001C36.2986 28.0058 36.284 28.4795 36.2113 30.0619C36.1447 31.5244 35.8999 32.3192 35.6953 32.8475C35.4227 33.5478 35.098 34.0475 34.5733 34.5716C34.0487 35.0958 33.5483 35.421 32.848 35.6936C32.32 35.8996 31.5248 36.1432 30.0624 36.2096C28.4813 36.2824 28.0063 36.2969 24.0006 36.2969C19.9949 36.2969 19.5212 36.2824 17.9406 36.2096ZM17.8164 9.09084C16.2196 9.16356 15.1284 9.41676 14.1755 9.78756C13.1886 10.1705 12.3532 10.6842 11.5183 11.5177C10.6835 12.3512 10.1711 13.188 9.78816 14.1749C9.41736 15.1284 9.16416 16.219 9.09144 17.8158C9.01752 19.4152 9.0006 19.9265 9.0006 24C9.0006 28.0735 9.01752 28.5848 9.09144 30.1842C9.16416 31.7812 9.41736 32.8716 9.78816 33.8251C10.1711 34.8114 10.6836 35.6491 11.5183 36.4823C12.353 37.3154 13.1886 37.8284 14.1755 38.2124C15.1302 38.5832 16.2196 38.8364 17.8164 38.9092C19.4166 38.9819 19.9271 39 24.0006 39C28.0741 39 28.5854 38.9831 30.1848 38.9092C31.7818 38.8364 32.8722 38.5832 33.8257 38.2124C34.812 37.8284 35.648 37.3158 36.4829 36.4823C37.3177 35.6488 37.829 34.8114 38.213 33.8251C38.5838 32.8716 38.8382 31.781 38.9098 30.1842C38.9825 28.5836 38.9994 28.0735 38.9994 24C38.9994 19.9265 38.9825 19.4152 38.9098 17.8158C38.837 16.2188 38.5838 15.1278 38.213 14.1749C37.829 13.1886 37.3164 12.3526 36.4829 11.5177C35.6494 10.6829 34.812 10.1705 33.8269 9.78756C32.8722 9.41676 31.7816 9.16236 30.186 9.09084C28.5866 9.01812 28.0753 9 24.0018 9C19.9283 9 19.4166 9.01692 17.8164 9.09084Z"
                  ></path>
                </svg>
              </a>

              <a className="" role="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  id="linked"
                  className="size-10"
                >
                  <g>
                    <path d="M16 0C7.163 0 0 7.163 0 16c0 8.836 7.163 16 16 16s16-7.164 16-16c0-8.837-7.163-16-16-16z"></path>
                    <path
                      fill="#FFF"
                      d="M24.294 22.942v-6.137c0-3.288-1.755-4.818-4.096-4.818-1.889 0-2.735 1.039-3.206 1.768v-1.517h-3.558c.047 1.005 0 10.704 0 10.704h3.558v-5.978c0-.319.023-.639.117-.867.257-.639.842-1.301 1.825-1.301 1.288 0 1.803.981 1.803 2.42v5.727l3.557-.001zM9.685 10.777c1.24 0 2.013-.823 2.013-1.85-.023-1.05-.773-1.849-1.99-1.849s-2.012.799-2.012 1.849c0 1.028.772 1.85 1.967 1.85h.022zm1.779 12.165V12.238H7.907v10.704h3.557z"
                    ></path>
                  </g>
                </svg>
              </a>

              <a className="" role="button">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="512"
                  height="512"
                  fill="none"
                  viewBox="0 0 512 512"
                  id="twitter"
                  className="size-9"
                >
                  <g clip-path="url(#clip0_84_15697)">
                    <rect width="512" height="512" fill="#000" rx="60"></rect>
                    <path
                      fill="#fff"
                      d="M355.904 100H408.832L293.2 232.16L429.232 412H322.72L239.296 302.928L143.84 412H90.8805L214.56 270.64L84.0645 100H193.28L268.688 199.696L355.904 100ZM337.328 380.32H366.656L177.344 130.016H145.872L337.328 380.32Z"
                    ></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_84_15697">
                      <rect width="512" height="512" fill="#fff"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </a>
            </div>
          </div>
        </section>
      </div>
    </footer>
    // </div>
  );
}
