import './style.scss'
// import $ from 'jquery'

window.onload = function () {

  const headerWrapper = document.querySelector('.header')
  const headerLink = document.querySelectorAll('.header-link')
  const reasonsLi = document.querySelectorAll('.reasons__li')
  const reasonsLiActive = 'reasons__li-active'
  const reasonsInfo = document.querySelectorAll('.reasons__info')
  const reasonsInfoActive = 'reasons__info-active'
  const typeSpan = document.querySelectorAll('.type__span')
  const typeActive = 'type-active'
  const typeRepairUl = document.querySelectorAll('.type-repair__ul')
  const typeRepairUlActive = 'type-repair__ul-active'
  const callbackFormButton = document.querySelector('.callback-form__button')
  const promo = document.querySelector('.promo')
  const main = document.querySelector('.main')
  const thank = document.querySelector('.thank')
  const thankButton = document.querySelector('.thank__button')
  const callbackFormBlock = document.querySelector('.callback-form__block')
  const closeAuth = document.querySelector('.close-auth')
  const formButtons = document.querySelectorAll('.form-button')


  window.addEventListener('scroll', () => {
    let scrollTop = window.scrollY
    if (scrollTop >= 100) {
      headerWrapper.classList.remove('header-active')
      headerLink.forEach(function (entry) {
        entry.classList.remove('header__link-active')
      })
    } else {
      headerWrapper.classList.add('header-active')
      headerLink.forEach(function (entry) {
        entry.classList.add('header__link-active')
      })
    }
  })

  const toggleThink = () => {
    promo.classList.toggle('promo-active')
    main.classList.toggle('main-active')
    thank.classList.toggle('thank-active')
  }

  const tab = function (tabNav, tabNavActive, tabItem, tabItemActive) {
    let tabName
    tabNav.forEach(item => {
      item.addEventListener('click', selectTabNav)
    })

    function selectTabNav() {
      tabNav.forEach(item => {
        item.classList.remove(tabNavActive)
      })
      this.classList.add(tabNavActive);
      tabName = this.getAttribute('data-tab-name')
      selectTabContent(tabName)
    }

    function selectTabContent(tabName) {
      tabItem.forEach(item => {
        item.classList.contains(tabName) ? item.classList.add(tabItemActive) : item.classList.remove(tabItemActive)
      })
    }
  }

  tab(reasonsLi, reasonsLiActive, reasonsInfo, reasonsInfoActive)
  tab(typeSpan, typeActive, typeRepairUl, typeRepairUlActive)



  formButtons.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault()
      callbackFormBlock.classList.add('form-active')
      if (this.classList.contains('header-button')) {
        callbackFormButton.innerHTML = 'Заказать звонок'
      } else {
        callbackFormButton.innerHTML = 'Получить диагностику'
      }
    })
  })

  closeAuth.addEventListener('click', function (e) {
    callbackFormBlock.classList.toggle('form-active')
  })
  callbackFormBlock.addEventListener('click', function (e) {
    if (e.target === callbackFormBlock) {
      callbackFormBlock.classList.toggle('form-active')
    }
  })


  thankButton.addEventListener('click', function () {
    toggleThink()
  })


  for (const key in document.forms) {
    if (key === 'length') return
    const phone = document.forms[key].user_phone
    phone.addEventListener('focus', () => {
      if(phone.value === '') phone.value = '+7'
    })
    document.forms[key].user_phone.addEventListener('keydown', function (e) {
      const code = e.keyCode
      // Разрешаем: backspace, delete, tab и escape
      if (code === 187 || code === 46 || code === 8 || code === 9 || e.code === 27 ||
        // Разрешаем: Ctrl+A
        (code === 65 && e.ctrlKey === true) ||
        // Разрешаем: home, end, влево, вправо
        (code >= 35 && code <= 39)) {
        // Ничего не делаем
        return
      } else {
        // Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
        if ((code < 48 || code > 57) && (code < 96 || code > 105)) {
          e.preventDefault()
        }
      }
      let curLen = phone.value.length;
      switch (curLen) {
        case 2:
          phone.value = phone.value + '('
          break
        case 6:
          phone.value = phone.value + ')-'
          break
        case 11:
          phone.value = phone.value + '-'
          break
        case 14:
          phone.value = phone.value + '-'
          break
        default:
          break
      }
    })

    document.forms[key].addEventListener('submit', function (event) {
      event.preventDefault()
      let user_name = document.forms[key].user_name.value
      let user_phone = document.forms[key].user_phone.value
      let select = document.forms[key].select.value
      const request = new XMLHttpRequest();
      const url = "telegram.php";
      const params =
        "user_name=" + encodeURIComponent(user_name) +
        "&user_phone=" + encodeURIComponent(user_phone) +
        "&select=" + encodeURIComponent(select)
      request.open("POST", url, true);
      request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200) {
          // условия если форма отправлена
          document.forms[key].reset()
          if(callbackFormBlock.classList.contains('form-active')){
            callbackFormBlock.classList.toggle('form-active')
          }
          toggleThink()
          window.scrollTo(0, 0)
        }
      });
      request.send(params);
    })
  }


}
