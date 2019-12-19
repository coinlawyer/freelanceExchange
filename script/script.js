document.addEventListener('DOMContentLoaded', () => {
    'use strict';
   
    const client = document.getElementById('customer'),
         freelancer = document.getElementById('freelancer'),
         clientBlock = document.querySelector('#block-customer'),
         freelancerBlock = document.querySelector('#block-freelancer'),
         choiceBlock = document.querySelector('#block-choice'),
         btnExit = document.querySelector('#btn-exit'),
         formCustomer = document.querySelector('#form-customer'),
         ordersTable = document.querySelector('#orders'),
         modalOrder = document.querySelector('#order_read'),
         modalOrderActive = document.querySelector('#order_active');


    const orders = [];
    
    const renderOrders = () => {
        ordersTable.textContent = '';
        orders.forEach((order, i) => {

            ordersTable.innerHTML += `
                <tr class="order" data-number-order="${i}">
                    <td>${i+1}</td>
                    <td>${order.title}</td>
                    <td class="${order.currency}"></td>
                    <td>${order.deadline}</td>
                </tr>`;
        });
    } 
    
    const openModal = (numberOrder) => {
        const order = orders[numberOrder];
        const modal = order.active ? modalOrderActive : modalOrder; 

        const modalHeader = document.querySelector('.modal-title '),
                modalEmail = document.querySelector('.email'),
                modalDescription = document.querySelector('.description'), 
                modalDeadline = document.querySelector('.deadline'), 
                modalCurrency = document.querySelector('.currency_img'), 
                modalPayment = document.querySelector('.count'),
                modalFirstName = document.querySelector('.firstName'), 
                modalPhone = document.querySelector('.phone');

                modalHeader.textContent = order.title;
                modalFirstName.textContent = order.firstName;
                modalDescription.textContent = order.description;
                modalEmail.textContent = order.email;
                modalDeadline.textContent = order.deadline;
                modalCurrency.classList.add(`${order.currency}`);
                modalPayment.textContent = order.count;
                modalPhone.setAttribute("href", `${order.phone}`);

        modal.style.display = 'block';
    }

    ordersTable.addEventListener('click', (event)=> {
        const target = event.target;
        const targetOrder = target.closest('.order');
        if (targetOrder) {
            openModal(targetOrder.dataset.numberOrder);
        }
    });

    client.addEventListener('click', () => {
        choiceBlock.style.display = 'none';
        clientBlock.style.display = 'block';
        btnExit.style.display = 'block';
    });

    freelancer.addEventListener('click', () => {
        choiceBlock.style.display = 'none';
        renderOrders();
        freelancerBlock.style.display = 'block';
        btnExit.style.display = 'block';
    });

    btnExit.addEventListener('click', ()=> {
        btnExit.style.display = 'none';
        freelancerBlock.style.display = 'none'; 
        clientBlock.style.display = 'none'; 
        choiceBlock.style.display = 'block';
    });

    formCustomer.addEventListener('submit', (event) => {
        event.preventDefault();
        const elements = [...formCustomer.elements];
        const elementsObj = {};
        elements.filter((elem) => {
                if ((elem.tagName === 'INPUT' || 'TEXTAREA') && 
                    elem.type !== "radio" ||
                    elem.type === "radio" && elem.checked) {
                    (elementsObj[elem.name] = elem.value); 
                }
        });
        orders.push(elementsObj);
        formCustomer.reset();
    });
    

});
