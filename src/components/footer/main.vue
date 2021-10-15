<template>
  <div class="intro-y mt-3 section-gap">

    <div class="footer-2  dark:bg-dark-5 pt-3 md:pt-6">
  <div class="container px-4 mx-auto">

    <div class="md:flex md:flex-wrap md:-mx-4 py-6 md:pb-12">

      <div class="footer-info lg:w-1/3 md:px-4">
        <h4 class="text-white text-2xl mb-4">KHON KAEN FISHING NET CO.,LTD.</h4>
        <p class="text-gray-400">บริษัท ขอนแก่นแหอวน จำกัด หรือ KKF เป็น บริษัทผู้ผลิตและจำหน่ายตาข่ายและอุปกรณ์การประมง การเกษตร ตลอดจนอุตสาหกรรมอื่นๆ ที่เกี่ยวข้อง
            ภายใต้แบรนด์ สินค้า <span class="font-medium">" เรือใบ "</span> หรือ <span class="font-medium">'SHIP'</span>
        </p>
        <div class="mt-4">
          <div class="flex flex-wrap">
                  <Tippy
            tag="a"
            href="https://web.facebook.com/KKFTHAILAND/"
            target="_blank"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border dark:border-dark-5 ml-2 text-gray-500 zoom-in"
            content="Facebook"
          >
            <FacebookIcon class="w-3 h-3 fill-current" />
          </Tippy>
          <Tippy
            tag="a"
            href="https://www.youtube.com/KKFThailand"
            target="_blank"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border dark:border-dark-5 ml-2 text-gray-500 zoom-in"
            content="Youtube"
          >
            <YoutubeIcon class="w-3 h-3 fill-current" />
          </Tippy>
          <Tippy
            tag="a"
            href="https://kkfnets.com/"
            target="_blank"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border dark:border-dark-5 ml-2 text-gray-500 zoom-in"
            content="KHON KAEN FISHING NET CO.,LTD."
          >
            <ActivityIcon class="w-3 h-3 fill-current" />
          </Tippy>

              </div>
        </div>
      </div>

      <div class="sm:w-1/3 md:w-2/3 lg:w-1/3 md:px-4 xl:pl-16 mt-12 lg:mt-0">
        <div class="sm:flex">
          <div class="sm:flex-1">
            <h6 class="text-base font-medium text-white uppercase mb-2">About</h6>
            <div>
              <a href="#" class="text-gray-400 py-1 block hover:underline">Company</a>
              <a href="#" class="text-gray-400 py-1 block hover:underline">Privacy Policy</a>
              <a href="#" class="text-gray-400 py-1 block hover:underline">Terms & Conditions</a>
              <a href="#" class="text-gray-400 py-1 block hover:underline">FAQ</a>
              <a href="#" class="text-gray-400 py-1 block hover:underline">Contact us</a>
            </div>
          </div>
          <div class="sm:flex-1 mt-4 sm:mt-0">
            <h6 class="text-base font-medium text-white uppercase mb-2">Session</h6>
            <div>
              <a href="/signin" class="text-gray-400 py-1 block hover:underline">Sign in</a>
              <a href="/signup" class="text-gray-400 py-1 block hover:underline">Register</a>
              <a href="/forgotpassword" class="text-gray-400 py-1 block hover:underline">Forgot Password</a>
            </div>
          </div>
        </div>
      </div>

      <div class="md:w-1/3 md:px-4 md:text-center mt-12 lg:mt-0">
        <h5 class="text-lg text-white font-medium mb-4">CONTACT US</h5>
        <div class="bg-indigo-600 text-white hover:bg-indigo-700 rounded py-2 px-6 md:px-12 transition-colors duration-300 text-left">
            <span class="w-100"> 115 หมู่ 17 ถนนมิตรภาพ ตำบลในเมือง อำเภอเมืองขอนแก่น จังหวัดขอนแก่น 40000</span> <br>
            <span>E-mail: kkf@kkfnets.com</span> <br>
            <span>Telephone: 02-6915256 - 9</span></div>
      </div>

    </div>

  </div>

  <div class="border-t border-solid border-gray-900 mt-4 py-4">
    <div class="container px-4 mx-auto">

      <div class="md:flex md:-mx-4 md:items-center">
        <div class="md:flex-1 md:px-4 text-center md:text-left">
          <p class="text-white">&copy; 2021 <strong>KHON KAEN FISHING NET FACTORY CO.,LTD.</strong> All Right Reserved</p>
        </div>
        <div class="md:flex-1 md:px-4 text-center md:text-right hidden">
          <a href="#" class="py-2 px-4 text-white inline-block hover:underline">Terms of Service</a>
          <a href="#" class="py-2 px-4 text-white inline-block hover:underline">Privacy Policy</a>
        </div>
      </div>

    </div>
  </div>

</div>
  </div>
</template>

<script>
export default {
  props: ['title', 'description', 'img'],
  data () {
    return {
      about: [
        {
          menuItem: 'message.about',
          path: '/about'
        },
        {
          menuItem: 'message.termAndCondition',
          path: '/term-condition'
        },
        {
          menuItem: 'message.privacyPolicy',
          path: '/privacy-policy'
        },
        {
          menuItem: 'message.faq',
          path: '/faq'
        },
        {
          menuItem: 'message.contactUs',
          path: '/contact'
        }
      ],
      session: [
        {
          menuItem: 'message.signIn',
          path: '/session/signin'
        },
        {
          menuItem: 'message.register',
          path: '/session/signup'
        },
        {
          menuItem: 'message.forgotPassword',
          path: '/session/forgot-password'
        },
        {
          menuItem: 'message.thankYou',
          path: '/session/thank-you'
        }
      ],
      categories: [
        {
          menuItem: 'message.men',
          path: '/products/men'
        },
        {
          menuItem: 'message.women',
          path: '/products/women'
        },
        {
          menuItem: 'message.accessories',
          path: '/products/accesories'
        },
        {
          menuItem: 'message.gadgets',
          path: '/products/gadgets'
        }
      ],
      socialLinks: [
        {
          menuItem: 'message.facebook',
          path: 'https://www.facebook.com/'
        },
        {
          menuItem: 'message.twitter',
          path: 'https://twitter.com/'
        },
        {
          menuItem: 'message.youtube',
          path: 'https://www.youtube.com/'
        },
        {
          menuItem: 'message.googlePlus',
          path: 'https://plus.google.com/discover'
        }

      ],
      copyrightText: 'copyrightText'
    }
  }
}
</script>

<style>
$facebook: #3b5998;
$twitter: #1da1f2;

.bg-facebook {
  background-color: $facebook;

  &:hover {
    background-color: darken($facebook, 5%);
  }
}

.bg-twitter {
  background-color: $twitter;

  &:hover {
    background-color: darken($twitter, 5%);
  }
}

</style>
