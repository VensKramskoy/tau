import { checkValue }       from '../_functions'
import { initAllDates }     from './customDate'
import { initSelects }      from './customSelect'
import { initDateDealMask } from './inputMask'


// Инициализация необходимых кастомных инпутов

const initInputs = () => {
  initAllDates()
  initDateDealMask()
  initSelects()
}

// добавление/удаление элементов в изменяемых списках

export const initChangeableLists = () => {
  const changeablePage = document.querySelector('ul[data-list="changeable"]')?.closest('main')

  if (changeablePage) {

    // Удаление элементов в изменяемых списках

    changeablePage.addEventListener('click', (e) => {
      if (e.target.dataset.btn === "delete") {
        e.target.closest('li').remove()
      }

      // Добавление элементов в изменяемых списках

      if (e.target.dataset.btn === "add") {
        const targetChangeableList = e.target.parentElement.querySelector('ul[data-list="changeable"]')
        let changeableInputs = targetChangeableList.querySelectorAll('input')

        //проверка наличия значений в инпутах, для запрета создания новых элементов без значения
        if (!checkValue(changeableInputs)) {
          return
        }
        const templateId = e.target.dataset.template
        let templateFragment = document.querySelector(`#${templateId}`)?.content
        let templateElement = templateFragment.firstElementChild.cloneNode(true)
        targetChangeableList.appendChild(templateElement)
        initInputs()
      }
    })

  }
}

initChangeableLists()




