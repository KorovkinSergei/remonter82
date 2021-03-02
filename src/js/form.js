import $ from "jquery";

const form1 = document.forms[0]
const form2 = document.forms[1]

form1.addEventListener('submit', function (event){
  console.log('click form1')
  event.preventDefault()
  const form_data = $(this).serialize()
  $.ajax({
    type: "POST",
    url: "telegram.php",
    data: form_data,
    success: function () {
      form1.reset()
      toggleThink()
      window.scrollTo(0, 0)
    }
  })
})

form2.addEventListener('submit', function (event){
  console.log('click form2')
  event.preventDefault()
  const form_data = $(this).serialize()
  $.ajax({
    type: "POST",
    url: "telegram.php",
    data: form_data,
    success: function () {
      callbackFormBlock.classList.toggle('form-active')
      form2.reset()
      toggleThink()
      window.scrollTo(0, 0)
    }
  })
})

