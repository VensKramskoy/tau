import AirDatepicker from "air-datepicker"

const initAllDates = () => {
  const allDateInputs = document.querySelectorAll('input[data-date-start]')

  if (allDateInputs) {
    allDateInputs.forEach(el => {
      const {dateStart} = el.dataset

      const customDate = new AirDatepicker(el, {
        startDate: dateStart,
        container: '.date-custom-container',
      })


      el.addEventListener('click', (e) => {
        const featuredDate = e.currentTarget.value.split('.').reverse().join('-')
        if (featuredDate) {
          customDate.selectDate(featuredDate)
          customDate.setViewDate(featuredDate)
        }
      })
    })
  }
}

initAllDates()


export { initAllDates }
