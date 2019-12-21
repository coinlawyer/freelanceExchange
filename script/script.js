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
         modalOrderActive = document.querySelector('#order_active'),
         bodyHtml = document.querySelector('body');

    const orders = JSON.parse(localStorage.getItem('freeOrders')) || [];

    const toLocalStorage = () => {
        localStorage.setItem('freeOrders', JSON.stringify(orders));
    };
    
    const renderOrders = () => {
        ordersTable.textContent = '';
        orders.forEach((order, i) => {
            ordersTable.innerHTML += `
                <tr class="order ${order.active ? 'taken' : ''}" 
                    data-number-order="${i}">
                    <td>${i+1}</td>
                    <td>${order.title}</td>
                    <td class="${order.currency}"></td>
                    <td>${order.deadline}</td>
                </tr>`;
        });
    }; 
    
    const openModal = (numberOrder) => {
        const order = orders[numberOrder];
        const { title, firstName, description, email, deadline, 
            currency, amount, phone, active = false} = order;

        const modal = active ? modalOrderActive : modalOrder; 

        const modalHeader = modal.querySelector('.modal-title '),
            modalEmail = modal.querySelector('.email'),
            modalDescription = modal.querySelector('.description'), 
            modalDeadline = modal.querySelector('.deadline'), 
            modalCurrency = modal.querySelector('.currency_img'), 
            modalPayment = modal.querySelector('.count'),
            modalFirstName = modal.querySelector('.firstName'), 
            modalPhone = modal.querySelector('.phone');

        modalHeader.textContent = title;
        modalFirstName.textContent = firstName;
        modalDescription.textContent = description;
        modalEmail.textContent = email;
        modalEmail.href = 'mailto:' + email;
        modalDeadline.textContent = deadline;
        modalCurrency.className = 'currency_img ';
        modalCurrency.classList.add(`${currency}`);
        modalPayment.textContent = amount;
        modal.id = numberOrder;
        
        // modalPhone ? modalPhone.href = 'tel:' + phone : '';
        modalPhone && (modalPhone.href = 'tel:' + phone) ; // the same as line above

        modal.style.display = 'flex'; 
        
        modal.addEventListener('click', closeModal);
    };

    const closeModal = (event) => {    
        const target = event.target;
        const modal = target.closest('.order-modal');
        const order = orders[modal.id];

        const basicModalActions = () => {
            modal.style.display = 'none';
            toLocalStorage();
            renderOrders();
        }

        if (target.closest('.close ') || (target === modal) ) { 
            modal.style.display = 'none';
        }

        if (target.classList.contains('get-order')) {
            order.active = true;
            basicModalActions();
        }

        if (target.classList.contains ('btn-danger')) {
            order.active = false;
            basicModalActions();
        }

        if (target.id === 'ready') {
            orders.splice(orders.indexOf(order), 1);
            basicModalActions();
        }
    };

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
        const elements = [...formCustomer.elements];//making array from html collection
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

        toLocalStorage();
    });
    

});
