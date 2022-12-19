// Появления списка элементов полученных от сервера в модалке нового сотрудника

import {
  closeSelectPopups,
  handlePopupInputs,
  sendData,
  serializeForm, showInfoModal,
} from "../_functions"
import { body, modalNewEmployee, modalOverlay } from '../_vars'

const employeePopupInput = document.querySelector('.modal-new-employee__input')

if (employeePopupInput) {
    employeePopupInput.addEventListener('input', handlePopupInputs)
}

// закрытие попап-селектов

const employeesPage = document.querySelector('.page-employees')

closeSelectPopups(employeesPage)


// отправка данных модалки нового сотрудника


const newEmployeeForm = document.querySelector('.modal-new-employee__form')
const newEmployeeDataInput = newEmployeeForm?.querySelector('.modal-new-employee__data-input')

async function handleFormSubmit (event) {
  event.preventDefault()
  if (!newEmployeeDataInput?.value) {
    employeePopupInput.classList.add('modal-new-employee__input_invalid')
    return
  }
  employeePopupInput.classList.remove('modal-new-employee__input_invalid')
  const data = serializeForm(event.target)
  const arrData = Array.from(data.entries())
  const jsonData = JSON.stringify(arrData)

  const response = await sendData(jsonData, '/include/ajax/send_invitation.php')
  const finishedResponse = await response.json()

  const {status, errortext} = finishedResponse
  if (status === 'ok') {
    showInfoModal('Приглашение отправлено')
    modalNewEmployee.classList.remove('_active')
    modalOverlay.classList.remove('modal-overlay_active')
    body.classList.remove('_lock')
  } else {
    showInfoModal(errortext)
  }
}


// Обработка события отправки

if (newEmployeeForm) {
  newEmployeeForm.addEventListener('submit', handleFormSubmit)
}
